import type { ReactElement } from "react";
import type { EarnPageProps } from "./types";
import { Flex } from "@/components/ui/flex";
import { useThemeApply } from "@/theme/apply";
import { Link, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { EarnPageDeal } from "./deal/deal";
import * as earnPage from "./index.css";
import { EarnPageLanding } from "./landing";

export function EarnPage<Network extends number>(props: EarnPageProps<Network>): ReactElement {
  const themeApply = useThemeApply();

  const { headerLogo, headerText, headerExtra } = props;

  return (
    <Router hook={useHashLocation}>
      <main className={earnPage.main} style={themeApply.style}>
        <div className={earnPage.pageContainer}>
          <header className={earnPage.header}>
            <Flex items="center" gap="xs" asChild>
              <Link to="/">
                {headerLogo}

                {headerText && (
                  <div className={earnPage.headerText}>
                    {headerText}
                  </div>
                )}
              </Link>
            </Flex>

            {headerExtra}
          </header>

          <Route path="/">
            <EarnPageLanding {...props} />
          </Route>

          <Route path="/deal/:id">
            {params => <EarnPageDeal {...props} id={params.id} />}
          </Route>
        </div>
      </main>
    </Router>
  );
}
