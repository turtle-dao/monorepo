import type { TokenEarn } from "@/types/types";

const depositTokenMock: TokenEarn[] = [
  {
    address: "0x0000000000000000000000000000000000000000",
    symbol: "USDC",
    decimals: 6,
  },
];

function useTokenDeposit(): TokenEarn[] {
  return depositTokenMock;
}

export default useTokenDeposit;
