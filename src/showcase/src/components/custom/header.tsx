import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header(): React.ReactElement {
  return (
    <header className="flex justify-end w-full p-2">
      <ConnectButton />
    </header>
  );
}
