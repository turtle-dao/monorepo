import type { JSX } from "react";

export function AssetIcon({ url }: { url: string }): JSX.Element {
  if (url) {
    return (
      <img src={url} alt="Asset" className="rounded-full w-7 h-7" />
    );
  }
  return (
    <span className="bg-[var(--color-text-accent)] rounded-full w-7 h-7"></span>
  );
}
