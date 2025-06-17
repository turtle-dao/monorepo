import type { JSX } from "react";

function Scrollable({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar">
      {children}
    </div>
  );
}

export default Scrollable;
