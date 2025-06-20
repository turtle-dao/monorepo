import type { EarnWalletBalancesResponse } from "@turtledev/api";
import type { JSX } from "react";
import { useEarnWalletBalances } from "@turtledev/react";
import { useAtom } from "jotai";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { IconWithOverlay } from "@/components/ui/icon-with-overlay";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { WidgetContainer } from "@/components/ui/widget-container";
import { depositDetailsAtom, selectedTokenAtom } from "@/store/sections";

function TokenSelector({ balances }: { balances: EarnWalletBalancesResponse | null }): JSX.Element {
  const [open, setOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);

  if (!balances || !balances.balances || balances.balances.length === 0) {
    return (
      <div className="rounded-full bg-[var(--color-surface-secondary)] px-4 py-2 text-[var(--color-text-primary)]">
        No tokens
      </div>
    );
  }

  const handleSelectToken = (balance: EarnWalletBalancesResponse["balances"][0]): void => {
    setSelectedToken({
      address: balance.token.address,
      name: balance.token.name,
      symbol: balance.token.symbol,
      decimals: balance.token.decimals,
      logo: balance.token.logos?.[0],
      balance: balance.amount,
      price: balance.token.price ?? undefined,
    });
    setOpen(false);
  };

  const currentToken = selectedToken || {
    symbol: balances.balances[0].token.symbol,
    logo: balances.balances[0].token.logos?.[0],
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!balances || !balances.balances || balances.balances.length === 0) {
      return;
    }

    setSelectedToken({
      address: balances.balances[0].token.address,
      name: balances.balances[0].token.name,
      symbol: balances.balances[0].token.symbol,
      decimals: balances.balances[0].token.decimals,
      logo: balances.balances[0].token.logos?.[0],
      balance: balances.balances[0].amount,
      price: balances.balances[0].token.price ?? undefined,
    });
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 rounded-full bg-[var(--color-surface-secondary)] pl-1 pr-3 py-1 hover:bg-[var(--color-surface-secondary)]/80 transition-colors">
          <IconWithOverlay
            icon={currentToken.logo || ""}
            alt={currentToken.symbol}
            size="sm"
          />
          <span className="text-[var(--color-text-primary)] font-medium">{currentToken.symbol}</span>
          {open
            ? (
                <ChevronUp className="w-4 h-4 text-[var(--color-text-primary)]" />
              )
            : (
                <ChevronDown className="w-4 h-4 text-[var(--color-text-primary)]" />
              )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="!bg-[#1a1a1a] !border-[var(--color-text-primary)]/20 !rounded-lg !p-2 !text-[var(--color-text-primary)] w-[320px]"
        align="end"
        sideOffset={8}
      >
        <div className="space-y-1">
          <h3 className="text-sm font-medium px-3 py-2 text-[var(--color-text-muted)]">Coin List</h3>
          {balances.balances.map((balance) => {
            const isSelected = selectedToken?.address === balance.token.address;

            return (
              <button
                key={balance.token.address}
                onClick={() => handleSelectToken(balance)}
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-colors ${
                  isSelected
                    ? "bg-[var(--color-surface-secondary)]"
                    : "hover:bg-[var(--color-surface-secondary)]/50"
                }`}
              >
                <img
                  src={balance.token.logos?.[0] || ""}
                  alt={balance.token.symbol}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{balance.token.symbol}</span>
                    <span className="text-sm text-[var(--color-text-muted)]">{balance.token.name}</span>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function Deposit(): JSX.Element {
  const { address } = useAccount();
  const { data: balances } = useEarnWalletBalances(
    address
      ? {
          chain: 1,
          user: address,
        }
      : undefined,
  );
  const [selectedToken] = useAtom(selectedTokenAtom);
  const [amount, setAmount] = useState("");
  const [depositDetails, setDepositDetails] = useAtom(depositDetailsAtom);

  useEffect(() => {
    setAmount("");
  }, [selectedToken]);

  useEffect(() => {
    setDepositDetails({
      amount,
      tokenAddress: selectedToken?.address ?? "",
      tokenDecimals: selectedToken?.decimals ?? 0,
      chain: "1",
    });
  }, [amount, selectedToken, setDepositDetails]);

  useEffect(() => {
    console.warn(depositDetails);
  }, [depositDetails]);

  const handleMaxClick = (): void => {
    if (selectedToken) {
      const maxAmount = formatUnits(BigInt(selectedToken.balance), selectedToken.decimals);
      setAmount(maxAmount);
    }
  };

  return (
    <>
      <div className="text-md text-[var(--color-text-primary)]">Deposit</div>
      <WidgetContainer variant="card" shadow="large" gradient={false}>
        <div className="flex items-center justify-between">
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="text-[var(--color-text-primary)] text-4xl w-2/4 pl-2 placeholder:text-[var(--color-text-primary)]/40 bg-transparent outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
          />
          <div className="flex flex-col items-end justify-center w-2/4 gap-2">
            <TokenSelector balances={balances || null} />
            <div className="flex gap-2 items-center">
              <span className="text-sm text-[var(--color-text-muted)]">
                Balance:
                {" "}
                {selectedToken ? formatUnits(BigInt(selectedToken.balance), selectedToken.decimals).slice(0, 8) : "0"}
              </span>
              <button
                onClick={handleMaxClick}
                className="bg-[var(--color-text-accent)] text-[var(--color-text-secondary)] text-xs font-semibold rounded-full px-1.5 py-0.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                Max
              </button>
            </div>
          </div>
        </div>
      </WidgetContainer>
    </>
  );
}
