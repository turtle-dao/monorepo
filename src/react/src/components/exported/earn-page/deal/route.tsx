import type { Address, Hex } from "viem";
import type { EarnPageProps } from "../types";
import type { DealPage } from "./deal";
import { ArrowUpRightIcon } from "@/components/icons/arrow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { Link } from "@/components/ui/link";
import { Logo } from "@/components/ui/logo";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Iterator } from "@/components/utils/iterator";
import { addressExplorer, txExplorer } from "@/lib/chains";
import { formatAddress, formatToken } from "@/lib/format";
import { type EarnRouteResponse, earnTyped } from "@turtledev/api";
import { Fragment, type ReactElement, type ReactNode, useMemo, useState } from "react";
import { match } from "ts-pattern";
import * as routeCss from "./route.css";
import { Substep, SubstepMini } from "./substep";

export function Route<Network extends number>({
  route,
  sendTransaction,
  setPage,
  network,
}: {
  route: EarnRouteResponse;
  setPage: (page: DealPage) => void;
} & EarnPageProps<Network>): ReactElement {
  const [step, setStep] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const buttonState = useMemo<[boolean, ReactNode, (() => void) | null]>(() => {
    if (step === route.steps.length)
      return [false, "Done", null];

    if (isSending) {
      return [false, <Fragment key="transacting">
        <Spinner />
        Transacting
      </Fragment>, null];
    }

    const stepAction = match(route.steps[step])
      .with({ kind: "approve" }, ({ token }) => `Approve ${token.symbol}`)
      .with({ kind: "enso" }, () => "Execute")
      .exhaustive();

    return [false, stepAction, async () => {
      if (isSending)
        return;

      setError(null);
      setIsSending(true);

      try {
        const tx = route.steps[step].tx;

        const hash = await sendTransaction({
          from: tx.from as Address,
          to: tx.to as Address,
          data: tx.data as Hex,
          value: BigInt(tx.value),
          chainId: network,
        });

        setStep(step + 1);
        setTxHash(hash);
      }
      catch (error) {
        setError(error as Error);
        console.error(error);
      }

      setIsSending(false);
    }];
  }, [isSending, network, route.steps, sendTransaction, step]);

  const steps = useMemo(() => {
    function mapper(step: earnTyped.RouterStep): {
      title: string;
      key: string;
      logo: string | undefined | null;
      ui: ReactNode;
      mini: ReactNode;
    } {
      return match(step)
        .with({ kind: "approve" }, ({ token, amount, spender }) => ({
          title: "Approve",
          key: `approve-${token.address}-${spender}`,
          logo: token.logos[0],
          ui: (
            <Text>
              Approving
              {" "}
              {token.logos[0] && <Logo src={token.logos[0]} size="xs" inline />}
              {" "}
              <Text asChild bold>
                <span>
                  {formatToken(amount, token, true)}
                  {" "}
                  {token.symbol}
                </span>
              </Text>
              {" "}
              for
              {" "}
              <Link href={addressExplorer(spender, 1)} target="_blank">
                {formatAddress(spender)}
              </Link>
            </Text>
          ),
          mini: (
            <Text>
              Approve
              {" "}
              {token.symbol}
            </Text>
          ),
        }))
        .with({ kind: "enso" }, ({ asset, substeps }) => ({
          title: "Enso",
          key: `enso-${asset}-${substeps.map(s => s.protocol).join("-")}`,
          logo: asset ? earnTyped.getAssetImage(asset)?.url : null,
          ui: (
            <Flex direction="column" gap="sm" items="stretch">
              <Iterator
                items={substeps}
                keyFn={substep => `${substep.kind}-${substep.protocol}-${substep.to.map(t => t.address).join("-")}-${substep.from.map(f => f.address).join("-")}`}
                render={({ item, index }) => <Substep substep={item} index={index} />}
                join={() => <div className={routeCss.subRouteSeparator} />}
              />
            </Flex>
          ),
          mini: (
            <Flex direction="column" gap="sm" items="stretch">
              <Iterator
                items={substeps}
                keyFn={substep => `${substep.kind}-${substep.protocol}-${substep.to.map(t => t.address).join("-")}-${substep.from.map(f => f.address).join("-")}`}
                render={({ item, index }) => (
                  <div className={routeCss.indented}>
                    <SubstepMini substep={item} index={index} />
                  </div>
                )}
              />
            </Flex>
          ),
        }))
        .exhaustive();
    }

    return route.steps.map(mapper);
  }, [route.steps]);

  if (step === route.steps.length) {
    return (
      <>
        <Text bold size="xl" align="center">Done</Text>

        <Card variant="secondary">
          <Iterator
            items={steps}
            keyFn={step => step.title}
            render={({ item: step, index }) => (
              <Flex direction="column" gap="sm" items="stretch">
                <Flex key={step.title} gap="sm">
                  <Text bold>
                    #
                    {index + 1}
                  </Text>
                  {step.logo && <Logo src={step.logo} size="sm" />}
                  <Text bold>{step.title}</Text>
                </Flex>

                {step.mini}
              </Flex>
            )}
            join={() => <div className={routeCss.subRouteSeparator} />}
          />
        </Card>

        <Flex justify="between" items="center">
          <Text size="sm" bold secondary>
            TX Hash
          </Text>

          <Text size="sm" bold>
            <Link href={txExplorer(txHash ?? "-", 1)} target="_blank">
              {(txHash && formatAddress(txHash)) || "-"}
            </Link>
          </Text>
        </Flex>

        <Flex gap="sm" items="center">
          <Button
            justify="center"
            onClick={() => setPage("deposit")}
            flex
            color="ghost"
          >
            Restart
          </Button>

          <Button
            justify="center"
            flex
            asChild
          >
            <Link color="button" href={txExplorer(txHash ?? "-", 1)} target="_blank">
              On Etherscan
              {" "}
              <ArrowUpRightIcon size="lg" />
            </Link>
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Flex items="center" gap="sm">
        <Text bold>
          #
          {step + 1}
        </Text>
        {steps[step].logo && <Logo src={steps[step].logo} size="sm" />}
        <Text bold>
          {steps[step].title}
        </Text>
      </Flex>

      <div className={routeCss.routeCard}>
        {steps[step].ui}
      </div>

      <Flex direction="column" gap="sm" items="stretch">
        <Flex justify="between" items="center">
          <Text size="sm" bold secondary>
            Gas
          </Text>

          <Text size="sm" bold>
            {route.steps[step].tx.gas}
          </Text>
        </Flex>

        <Flex justify="between" items="center">
          <Text size="sm" bold secondary>
            To
          </Text>

          <Text size="sm" bold>
            <Link href={addressExplorer(route.steps[step].tx.to, 1)} target="_blank">
              {formatAddress(route.steps[step].tx.to)}
            </Link>
          </Text>
        </Flex>
      </Flex>

      <Flex items="center">
        <Button
          justify="center"
          color="ghost"
          onClick={() => setPage("deposit")}
          flex
        >
          Cancel
        </Button>

        <Button
          justify="center"
          disabled={buttonState[0]}
          onClick={() => buttonState[2]?.()}
          flex
        >
          {buttonState[1]}
        </Button>
      </Flex>

      {error && <Text error>{error.name}</Text>}
    </>
  );
}
