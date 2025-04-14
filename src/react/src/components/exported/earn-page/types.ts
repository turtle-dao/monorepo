export interface EarnPageProps {
  user?: string;
  referral?: string;
  network?: string;
  headerLogo?: React.ReactNode;
  headerText?: React.ReactNode;
  headerExtra?: React.ReactNode;
  openConnectionModal?: () => void;
  signMessage: (message: string) => Promise<string>;
  startSigning?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}
