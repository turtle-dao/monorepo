import { ConnectButton } from "@rainbow-me/rainbowkit";
import { JoinButton } from "@turtle/react";
import { useState, version } from "react";
import { useAccount, useSignMessage } from "wagmi";

export default function Home(): React.ReactElement {
  const [error, setError] = useState<Error | null>(null);
  const [done, setDone] = useState(false);

  const { address: account, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();

  return (
    <div className="w-screen h-screen bg-zinc-950 text-white flex justify-center p-2 pt-4 sm:pt-10">
      <div className="p-3 flex flex-col gap-3 w-full max-w-[450px]">
        <h1 className="text-2xl font-bold">Turtle Preview (internal)</h1>

        <ConnectButton />

        {account && (
          <JoinButton
            user={account}
            network={chainId?.toString()}
            signMessage={message => signMessageAsync({ message })}
            onError={setError}
            startSigning={() => {
              setError(null);
              setDone(false);
            }}
            onSuccess={() => setDone(true)}
            referral="FOX"
          />
        )}

        {error && <p className="text-red-500 font-medium">{error.message}</p>}

        {done && <p className="text-green-500 font-medium">Signup successful!</p>}

        <p className="text-zinc-200">
          React version:
          {" "}
          {version}
        </p>
      </div>
    </div>
  );
}
