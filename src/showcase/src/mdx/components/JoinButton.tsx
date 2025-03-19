import { JoinButton } from "@turtledev/react";
import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

export function Join(): React.ReactElement {
  const [error, setError] = useState<Error | null>(null);
  const [done, setDone] = useState(false);

  const { address: account, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();

  return (
    <div>
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

      {!account && <p className="font-medium">Connect your wallet to join</p>}

      {error && <p className="text-red-500 font-medium">{error.message}</p>}

      {done && <p className="text-green-500 font-medium">Signup successful!</p>}
    </div>
  );
}
