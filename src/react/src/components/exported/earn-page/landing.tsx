import type { EarnPageProps } from "./types";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flex, FlexItem } from "@/components/ui/flex";
import { Logo } from "@/components/ui/logo";
import { Table } from "@/components/ui/table";
import { Heading, Text } from "@/components/ui/text";
import { useEarnDeals, useExists, usePrepareSignup, useSignup } from "@/hooks";
import { chainLogo, chainName } from "@/lib/chains";
import { formatNumber } from "@/lib/format";
import { rounding } from "@/theme/constants.css";
import * as earnPageLanding from "./landing.css";

export function EarnPageLanding<Network extends number>({
  user,
  campaignId,
  network,
  openConnectionModal,
  signMessage,
  startSigning,
  onError,
  onSuccess,
}: EarnPageProps<Network>): React.ReactElement {
  const [signing, setSigning] = useState(false);

  const { data: deals } = useEarnDeals({ campaignId });

  const {
    data: exists,
    refetch,
    isLoading: existsLoading,
  } = useExists(user ? { user } : undefined);

  const {
    data: prepareData,
  } = usePrepareSignup(user && !existsLoading && exists !== true ? { user } : undefined);

  const { mutateAsync } = useSignup((user && prepareData)
    ? {
        user,
        signupToken: prepareData.signup_token,
        referral: undefined,
        network: network.toString(),
      }
    : undefined);

  const sign = useMemo(() => async (): Promise<void> => {
    if (!prepareData)
      return;

    setSigning(true);

    try {
      startSigning?.();

      const signature = await signMessage(prepareData.sign_message);
      const result = await mutateAsync(signature);

      if (result) {
        onSuccess?.();
        refetch();
      }
      else {
        onError?.(new Error("Failed to sign up"));
      }
    }
    catch (error) {
      onError?.(error as Error);
    }
    finally {
      setSigning(false);
    }
  }, [
    prepareData,
    startSigning,
    signMessage,
    mutateAsync,
    onSuccess,
    refetch,
    onError,
  ]);

  const buttonState = useMemo(() => {
    if (signing) {
      return {
        text: "Joining...",
        action: undefined,
      };
    }

    if (!user) {
      return {
        text: "Connect Wallet",
        action: openConnectionModal,
      };
    }

    if (exists === false) {
      return {
        text: "Join Turtle",
        action: sign,
      };
    }

    return {
      text: "Explore Deal",
      action: null,
    };
  }, [exists, user, signing, openConnectionModal, sign]);

  return (
    <>
      <Table
        title="Active Deals"
        items={deals?.metadata ? Object.values(deals.metadata) : []}
        keyFn={({ id }) => id}
        searchItems={({ name, description }) => [name, description]}
        orderBy={(a, b) => b.totalTvl - a.totalTvl}
        filters={[
          {
            name: "Chain",
            value: item => item.chains.map(chain => ({
              value: chainName(chain),
              icon: <img src={chainLogo(chain)} />,
            })),
          },
        ]}
        render={({ item: { id, name, description, iconUrl, totalTvl, chains } }) => {
          return (
            <Card key={id} variant="accent" className={rounding({ size: "lg" })}>
              <div className={earnPageLanding.cardHeader}>
                <div className={earnPageLanding.emptyLogo}>
                  <img src={iconUrl} alt={name} />
                </div>

                <Heading level={3}>
                  {name}
                </Heading>
              </div>

              <Flex items="center" gap="sm">
                <Text bold>Available on</Text>

                {chains.map(chain => (
                  <Logo key={chain} src={chainLogo(chain)} size="sm" />
                ))}
              </Flex>

              {description && (
                <Text>
                  {description}
                </Text>
              )}

              <FlexItem />

              <div>
                <Card className={rounding({ size: "lg" })}>
                  <Flex direction="column" gap="none">
                    <Text bold secondary>TVL</Text>

                    <Text size="xl" bold>
                      $
                      {formatNumber(totalTvl, 2, true, true)}
                    </Text>
                  </Flex>
                </Card>
              </div>

              <div className={earnPageLanding.cardActions}>
                {buttonState.action == null && (
                  <Button asChild block justify="center">
                    <Link to={`/deal/${id}`}>
                      {buttonState.text}
                    </Link>
                  </Button>
                )}

                {buttonState.action !== null && (
                  <Button onClick={() => buttonState.action?.()} block justify="center">
                    {buttonState.text}
                  </Button>
                )}
              </div>
            </Card>
          );
        }}
      />
    </>
  );
}
