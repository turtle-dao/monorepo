import type { EarnRouteResponse, earnTyped } from "@turtledev/api";
import type { EarnPageProps } from "../types";
import type { DealPage } from "./deal";
import { ArrowDownIcon } from "@/components/icons/arrow";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { Logo } from "@/components/ui/logo";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { type Token, TokenInput, type TokenState } from "@/components/ui/token-input";
import { formatNumber, formatToken } from "@/lib/format";
import { Fragment, type ReactElement, type ReactNode, useMemo } from "react";
import * as deposit from "./deposit.css";

export function Deposit<Network extends number>({
  user,
  inputTokenState,
  route: [route, routeError],
  openConnectionModal,
  setPage,
  balanceTokens,
  selectedVault,
}: {
  inputTokenState: TokenState;
  route: [EarnRouteResponse | null | undefined, Error | null];
  setPage: (page: DealPage) => void;
  balanceTokens: Token[];
  selectedVault: earnTyped.DefiToken | null;
} & EarnPageProps<Network>): ReactElement {
  const buttonState = useMemo<[boolean, ReactNode, (() => void) | null]>(() => {
    if (!user)
      return [false, "Connect wallet", openConnectionModal ?? null];

    if (inputTokenState.error)
      return [true, inputTokenState.error, null];

    if (routeError) {
      console.error(routeError);
      return [true, "Error fetching route", null];
    }

    if (inputTokenState.isZero)
      return [true, "Enter an amount", null];

    if (!selectedVault)
      return [true, "Select a vault", null];

    if (!route) {
      return [true, <Fragment key="loading">
        <Spinner />
        Loading route
      </Fragment>, null];
    }

    return [false, "Deposit", () => {
      setPage("route");
    }];
  }, [
    inputTokenState.error,
    inputTokenState.isZero,
    openConnectionModal,
    route,
    routeError,
    selectedVault,
    setPage,
    user,
  ]);

  return (
    <>
      <Text bold>Deposit</Text>

      <TokenInput state={inputTokenState} tokens={balanceTokens} />

      <div className={deposit.flowArrowContainer}>
        <div className={deposit.flowArrow}>
          <ArrowDownIcon />
        </div>
      </div>

      <div className={deposit.outputCard}>
        {!selectedVault && <Text bold>No vault selected.</Text>}

        {selectedVault && (
          <Flex direction="column" gap="sm" items="stretch">
            <Flex items="center" gap="md">
              {selectedVault.underlying_tokens[0]?.logos[0] && (
                <Logo src={selectedVault.underlying_tokens[0].logos[0]} size="sm" />
              )}

              <Text bold>
                {selectedVault.token.name}
              </Text>
            </Flex>

            <Text bold size="xl" overflowDots>
              {route?.amount_out
                ? formatToken(route.amount_out, selectedVault.token)
                : "-"}
            </Text>

            <Flex justify="between" items="center">
              <Text bold secondary size="sm">Price Impact</Text>

              <Text bold size="sm">
                {route?.price_impact
                  ? `${formatNumber(route.price_impact * 100, 3, false, false)}%`
                  : "-"}
              </Text>
            </Flex>
          </Flex>
        )}
      </div>

      <Button
        justify="center"
        disabled={buttonState[0]}
        onClick={() => buttonState[2]?.()}
      >
        {buttonState[1]}
      </Button>
    </>
  );
}
