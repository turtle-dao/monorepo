import type { ReactElement } from "react";
import type { EarnPageProps } from "./types";
import { Link, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Flex } from "@/components/ui/flex";
import { useThemeApply } from "@/theme/apply";
import { EarnPageDeal } from "./deal/deal";
import * as earnPage from "./index.css";
import { EarnPageLanding } from "./landing";

export function EarnPage<Network extends number>(props: EarnPageProps<Network>): ReactElement {
  const themeApply = useThemeApply();

  const { header } = props;

  return (
    <Router hook={useHashLocation}>
      <div className={earnPage.main} style={themeApply.style}>
        <div className={earnPage.pageContainer}>
          {header && (
            <header className={earnPage.header}>
              <Flex items="center" gap="xs" asChild>
                <Link to="/">
                  {header.logo}

                  {header.text && (
                    <div className={earnPage.headerText}>
                      {header.text}
                    </div>
                  )}
                </Link>
              </Flex>

              {header.extra}
            </header>
          )}

          {!header && <div />}

          <Route path="/">
            <EarnPageLanding {...props} />
          </Route>

          <Route path="/deal/:id">
            {params => <EarnPageDeal {...props} id={params.id} />}
          </Route>
        </div>
      </div>
    </Router>
  );
}
