import type { EarnRouteOptions, EarnRouteResponse, earnTyped } from "@turtledev/api";
import type { EarnPageProps } from "../types";
import type { Token } from "@/components/ui/token-input";
import { type ReactElement, useMemo, useState } from "react";
import { match } from "ts-pattern";
import { parseUnits } from "viem";
import { Link as WouterLink } from "wouter";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/icons/arrow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { Link } from "@/components/ui/link";
import { Logo } from "@/components/ui/logo";
import { Spinner } from "@/components/ui/spinner";
import { Table } from "@/components/ui/table";
import { Heading, Text } from "@/components/ui/text";
import { useTokenState } from "@/components/ui/token-input";
import { Z } from "@/components/ui/z";
import { useEarnDeals, useEarnWalletBalances } from "@/hooks";
import { useEarnRoute } from "@/hooks/endpoints/earn/useRoute";
import { addressExplorer, chainLogo, chainName, getChainById } from "@/lib/chains";
import { formatAddress, formatNumber } from "@/lib/format";
import { rounding } from "@/theme/constants.css";
import * as deal from "./deal.css";
import { Deposit } from "./deposit";
import { Route } from "./route";

export type DealPage = "deposit" | "route";

export function EarnPageDeal<Network extends number>({
  id,
  ...props
}: EarnPageProps<Network> & { id: string }): ReactElement {
  const [page, setPageRaw] = useState<"deposit" | "route">("deposit");
  const [route, setRoute] = useState<EarnRouteResponse | null>(null);
  const [selectedVault, setSelectedVault] = useState<earnTyped.DefiToken | null>(null);
  const inputTokenState = useTokenState();

  const selectedChain = useMemo(() => {
    if (!selectedVault)
      return 1;

    return selectedVault.token.chain;
  }, [selectedVault]);

  const { data: deals } = useEarnDeals({ campaignId: props.campaignId });
  const { data: balances } = useEarnWalletBalances(props.user
    ? {
        chain: selectedChain,
        user: props.user,
      }
    : undefined);

  const { data: fetchedRoute, error: routeError } = useEarnRoute(useMemo(() => {
    if (!props.user || !selectedVault || !inputTokenState.selectedToken || inputTokenState.isZero)
      return undefined;

    // let maxAmount = BigInt(inputTokenState.selectedToken.balance);
    let amount = parseUnits(inputTokenState.realAmount, inputTokenState.selectedToken.decimals);

    // if (amount > maxAmount)
    //   amount = maxAmount;

    return {
      chain: selectedChain,
      user: props.user,
      tokenIn: inputTokenState.selectedToken.address,
      tokenOut: selectedVault.token.address,
      amount: amount.toString(),
      slippage: 0.02,
      referral: props.referral,
      id: selectedVault.metadata.id,
    } as EarnRouteOptions;
  }, [
    props.user,
    selectedVault,
    inputTokenState.selectedToken,
    inputTokenState.isZero,
    inputTokenState.realAmount,
    selectedChain,
    props.referral,
  ]));

  const balanceTokens = useMemo(() => {
    if (!balances)
      return [];

    return balances.balances.map<Token>(({ amount, token }) => ({
      balance: amount,
      address: token.address,
      name: token.name,
      symbol: token.symbol,
      decimals: token.decimals,
      logo: token.logos[0],
      price: token.price ?? undefined,
    }));
  }, [balances]);

  const { data, content } = useMemo(() => {
    if (!deals) {
      return {
        content: (
          <Flex justify="center" items="center" gap="md" style={{ marginTop: "50px" }}>
            <Spinner />
            <Text bold size="xl">Loading deals</Text>
          </Flex>
        ),
        data: undefined,
      };
    }

    const metadata = deals.metadata[id.toLowerCase()];

    if (!metadata) {
      return {
        content: (
          <Flex direction="column" items="center" gap="md" style={{ marginTop: "50px" }}>
            <Text bold size="xl">Deal not found</Text>
            <Button asChild>
              <WouterLink to="/">
                Home
              </WouterLink>
            </Button>
          </Flex>
        ),
        data: undefined,
      };
    }

    return {
      content: undefined,
      data: {
        metadata,
        tokens: deals.deals.filter(deal => deal.metadata.id === metadata.id),
      },
    };
  }, [deals, id]);

  function setPage(page: DealPage): void {
    match(page)
      .with("deposit", () => {
        setRoute(null);
        setPageRaw("deposit");
      })
      .with("route", () => {
        if (!fetchedRoute)
          return;

        setRoute(fetchedRoute);
        setPageRaw("route");
      })
      .exhaustive();
  }

  return (
    <Flex>
      <Flex direction="column">
        <Flex>
          <Button color="ghost" size="sm" asChild>
            <WouterLink to="/">
              <ArrowLeftIcon inline size="lg" />
              Back
            </WouterLink>
          </Button>
        </Flex>

        <div className={deal.actionCard}>
          {page === "deposit" && (
            <Deposit
              inputTokenState={inputTokenState}
              route={[fetchedRoute, routeError]}
              setPage={setPage}
              balanceTokens={balanceTokens}
              selectedVault={selectedVault}
              {...props}
            />
          )}

          {page === "route" && route && (
            <Route route={route} routeChain={selectedChain} setPage={setPage} {...props} />
          )}
        </div>
      </Flex>

      <div className={deal.content}>
        {content && <Z>{content}</Z>}

        { data && (
          <>

            <Z>
              <Card className={rounding({ size: "lg" })}>
                <Flex items="center" gap="md">
                  {data.metadata.iconUrl && <Logo src={data.metadata.iconUrl} />}

                  <Heading level={1}>
                    {data.metadata.name ?? "_"}
                  </Heading>
                </Flex>

                <Text secondary>{data.metadata.description}</Text>
              </Card>
            </Z>

            <Table
              items={data.tokens ?? null}
              keyFn={item => `${item.token.name}-${item.token.address}`}
              searchItems={item => [item.token.name, item.token.symbol, item.token.address]}
              gridClassName={deal.grid}
              orderBy={(a, b) => b.data.tvl - a.data.tvl}
              filters={[
                {
                  name: "Chain",
                  value: item => ({
                    value: chainName(item.token.chain),
                    icon: <img src={chainLogo(item.token.chain)} />,
                  }),
                },
                {
                  name: "Underlying",
                  value: item => ({
                    value: item.underlying_tokens[0]?.symbol,
                    icon: <>
                      {item.underlying_tokens[0]?.logos[0]
                      && <img src={item.underlying_tokens[0].logos[0]} />}
                    </>,
                  }),
                },
              ]}
              render={function DealToken({ item: token }) {
                return (
                  <div
                    key={id}
                    className={deal.tokenCard({
                      selected: token.token.address === selectedVault?.token.address,
                    })}
                    onClick={() => setSelectedVault(token)}
                  >
                    <Flex items="center" gap="xl" justify="between">
                      <Flex direction="column" gap="sm">
                        <Flex items="center">
                          {token.token.logos[0] && (
                            <Logo src={token.token.logos[0]} />
                          )}

                          <Heading level={3}>
                            {token.token.name}
                          </Heading>
                        </Flex>

                        {token.underlying_tokens[0] && (
                          <Flex items="center" gap="sm">
                            <Text>
                              Using
                            </Text>
                            <Logo src={token.underlying_tokens[0].logos[0]} inline size="sm" />
                            <Text bold>
                              {token.underlying_tokens[0].symbol}
                            </Text>
                            <Text>
                              On
                            </Text>
                            <Logo src={chainLogo(token.token.chain)} inline size="sm" />
                            <Text bold>
                              {chainName(token.token.chain)}
                            </Text>
                          </Flex>
                        )}

                        <Flex items="center">
                          <Text secondary bold>{token.token.symbol}</Text>

                          <Link
                            href={addressExplorer(token.token.address, token.token.chain)}
                            target="_blank"
                            onClick={e => e.stopPropagation()}
                          >
                            {formatAddress(token.token.address)}
                            <ArrowUpRightIcon inline size="lg" />
                          </Link>
                        </Flex>
                      </Flex>

                      <Flex gap="lg">
                        <div>
                          <Text secondary>Vault APY</Text>
                          <Text bold size="lg">
                            {formatNumber(token.data.apy * 100, 2, false, false)}
                            %
                          </Text>
                        </div>

                        <div>
                          <Text secondary>Vault TVL</Text>
                          <Text bold size="lg">
                            $
                            {formatNumber(token.data.tvl, 2, true, false)}
                          </Text>
                        </div>
                      </Flex>
                    </Flex>
                  </div>
                );
              }}
            />
          </>
        ) }
      </div>
    </Flex>
  );
}
