import { EarnPageWizard } from "@/components/custom/earn-page-wizard";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TurtleLogo } from "@turtledev/react";
import { Link } from "react-router";
import BookOpen from "~icons/heroicons/book-open-16-solid";
import Star from "~icons/heroicons/star-16-solid";
import "@turtledev/react/styles.css";

export function EarnPageWizardPage(): React.ReactElement {
  return (
    <main className="flex justify-center w-full min-h-screen bg-white dark:bg-zinc-950">
      <div className="flex flex-col gap-8 w-full max-w-[1200px] px-8 mt-8 mb-12">
        <div className="flex justify-between">
          <Link to="/">
            <TurtleLogo className="w-10 h-10" />
          </Link>

          <ConnectButton />
        </div>

        <div>
          <div className="text-2xl font-medium">Earn Page Wizard</div>

          <div className="flex gap-2 mt-3">
            <Button variant="ghost" asChild>
              <Link to="/components/earn-page">
                <BookOpen />
                Docs
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link to="/earn">
                <Star />
                Example
              </Link>
            </Button>
          </div>
        </div>

        <EarnPageWizard />
      </div>
    </main>
  );
}
