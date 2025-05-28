import { useState } from "react";
import { match } from "ts-pattern";
import { useExists, usePrepareSignup, useSignup } from "@/hooks";

export function JoinButton({
  user,
  referral,
  network,
  style,
  signMessage,
  startSigning,
  onError,
  onSuccess,
}: {
  user: string;
  referral?: string;
  network?: string;
  style?: React.CSSProperties;
  signMessage: (message: string) => Promise<string>;
  startSigning?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}): React.ReactNode {
  const [signing, setSigning] = useState(false);

  const {
    data: exists,
    refetch,
    isLoading: existsLoading,
  } = useExists(user ? { user } : undefined);

  const {
    data: prepareData,
    isLoading: prepareLoading,
  } = usePrepareSignup(user && !existsLoading && exists !== true ? { user } : undefined);

  const { mutateAsync } = useSignup((user && prepareData)
    ? {
        user,
        signupToken: prepareData.signup_token,
        referral,
        network,
      }
    : undefined);

  const message = match(true as boolean)
    .with(existsLoading || prepareLoading, () => "Loading...")
    .with(exists ?? false, () => "Already signed up")
    .with(signing, () => "Signing...")
    .otherwise(() => null);

  const hasMessage = message !== null;

  return (
    <button
      type="button"
      style={{
        backgroundColor: hasMessage ? "hsl(0 0% 20%)" : "hsl(117 85% 69%)",
        color: hasMessage ? "white" : "black",
        cursor: hasMessage ? "default" : "pointer",
        borderRadius: "10px",
        padding: "10px 20px",
        fontWeight: 500,
        fontSize: "16px",
        border: "none",
        outline: "none",
        ...style,
      }}
      onClick={async () => {
        if (signing || !prepareData || hasMessage)
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
      }}
    >
      {hasMessage ? message : "Join"}
    </button>
  );
}
