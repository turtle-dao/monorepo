import type { TokenEarn } from "@/types/types";

const depositTokenMock = [
  {
    address: "0x0000000000000000000000000000000000000000",
    symbol: "USDC",
    decimals: 6,
  },
];

function useTokenEarn(): TokenEarn[] {
  return depositTokenMock;
}

export default useTokenEarn;
