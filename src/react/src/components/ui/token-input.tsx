import { NATIVE_ADDRESS } from "@turtledev/api";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ReactElement, useMemo, useState } from "react";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/format";
import { ChevronDownIcon } from "../icons/chevron";
import { Button } from "./button";
import { Flex, FlexItem } from "./flex";
import { Logo } from "./logo";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { popoverWidth } from "./popover.css";
import { Text } from "./text";
import * as tokenInput from "./token-input.css";

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
  logo?: string;
  price?: number;
}

export interface TokenState {
  selectedToken: Token | null;
  setSelectedToken: (token: Token | null) => void;
  amount: string;
  setAmount: (amount: string) => void;
  realAmount: string;
  realAmountNumber: number | null;
  isZero: boolean;
  selectedTokenAmount: number;
  error: string | null;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTokenState(): TokenState {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<string>("");

  const realAmount = useMemo(() => {
    if (amount === "")
      return "";

    let base = amount.replace(/,/g, "");

    if (base.endsWith("."))
      base = base.slice(0, -1);

    if (base.startsWith("."))
      base = `0${base}`;

    return base;
  }, [amount]);

  const realAmountNumber = useMemo(() => {
    if (!realAmount)
      return null;

    const num = Number.parseFloat(realAmount);

    if (Number.isNaN(num))
      return null;

    return num;
  }, [realAmount]);

  const isZero = useMemo(() => {
    if (!realAmount)
      return true;

    return Number.parseFloat(realAmount) === 0;
  }, [realAmount]);

  const selectedTokenAmount = useMemo(() => {
    if (!selectedToken)
      return 0;

    return Number.parseFloat(formatUnits(BigInt(selectedToken.balance), selectedToken.decimals));
  }, [selectedToken]);

  const error = useMemo(() => {
    if (amount !== "" && !selectedToken)
      return "No token selected";

    if (Number.parseFloat(realAmount) > selectedTokenAmount)
      return "Not enough balance";

    return null;
  }, [realAmount, selectedTokenAmount, amount, selectedToken]);

  return {
    selectedToken,
    setSelectedToken,
    amount,
    setAmount,
    realAmount,
    realAmountNumber,
    isZero,
    selectedTokenAmount,
    error,
  };
}

export function TokenInput(
  {
    state,
    tokens,
  }: {
    state: TokenState;
    tokens: readonly Token[];
  },
): ReactElement {
  const [popoverOpen, setPopoverOpen] = useState(false);

  function clickMax(): void {
    if (!state.selectedToken)
      return;

    const amount = state.selectedToken.address === NATIVE_ADDRESS
      ? Math.max(state.selectedTokenAmount - 0.01, 0)
      : state.selectedTokenAmount;

    state.setAmount(amount.toString());
  }

  const processedTokens = useMemo(() =>
    tokens.map((token) => {
      const tokenAmount = formatUnits(BigInt(token.balance), token.decimals);
      const tokenNumber = Number.parseFloat(tokenAmount);

      return {
        token,
        tokenAmount,
        tokenNumber,
      };
    })
      .filter(token => token.tokenNumber > Number.EPSILON)
      .sort((a, b) => (b.tokenNumber * (b.token.price ?? 0)) - (a.tokenNumber * (a.token.price ?? 0))), [tokens]);

  return (
    <div className={tokenInput.card}>
      <Flex items="center">
        <input
          type="text"
          className={tokenInput.input({
            error: state.error !== null,
          })}
          value={state.amount}
          onChange={(e) => {
            const value = e.target.value;

            if (value !== "" && !/^(?:\d+(?:,\d{3})*(?:\.\d*)?|\.\d+)$/.test(value))
              return;

            state.setAmount(value);
          }}
          placeholder="0.00"
        />

        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button color="outline" pill>
              { state.selectedToken?.logo && <Logo src={state.selectedToken?.logo} size="sm" /> }
              { state.selectedToken?.symbol ?? "Token" }
              <ChevronDownIcon size="lg" />
            </Button>
          </PopoverTrigger>
          <PopoverContent style={assignInlineVars({
            [popoverWidth]: "300px",
          })}
          >
            <Flex direction="column" items="stretch" gap="xs">
              <Text>
                Select Token
              </Text>

              <div />

              {processedTokens.length === 0 && (
                <Text>
                  No tokens found
                </Text>
              )}

              {processedTokens.map(({ token, tokenAmount, tokenNumber }) => {
                return (
                  <Button
                    key={token.address}
                    color="ghost"
                    onClick={() => {
                      state.setSelectedToken(token);
                      setPopoverOpen(false);
                    }}
                    size="sm"
                  >
                    {token.logo && <Logo src={token.logo} size="sm" />}

                    <Flex direction="column" items="start" gap="none" style={{ marginLeft: 4 }}>
                      <Text bold size="sm">{token.name}</Text>
                      <Text bold secondary size="sm">{token.symbol}</Text>
                    </Flex>

                    <FlexItem />

                    <Flex direction="column" items="end" gap="none">
                      <Text bold size="sm">{formatNumber(tokenAmount, 6, false, false)}</Text>
                      {token.price && (
                        <Text bold secondary size="sm">
                          $
                          {formatNumber(tokenNumber * token.price, 2, false, false)}
                        </Text>
                      )}
                    </Flex>
                  </Button>
                );
              })}
            </Flex>
          </PopoverContent>
        </Popover>
      </Flex>

      <Flex justify="end" items="center">
        { state.selectedToken?.price && state.realAmountNumber && (
          <Text>
            $
            {formatNumber(state.realAmountNumber * state.selectedToken.price, 2, false, false)}
          </Text>
        )}

        <FlexItem />

        <Text>
          Balance:
          {" "}
          { state.selectedToken?.balance
            ? formatNumber(state.selectedTokenAmount, 6, false, false)
            : "-" }
        </Text>

        <Button
          size="xs"
          onClick={clickMax}
        >
          MAX
        </Button>
      </Flex>
    </div>
  );
}
