import type { EarnPageProps } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Heading, Text } from "@/components/ui/text";
import { Z } from "@/components/ui/z";
import { useExists, useOrganizations, usePrepareSignup, useSignup } from "@/hooks";
import { useOrganizationsDeals } from "@/hooks/endpoints/useOrganizationsDeals";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { TurtleLogo } from "../TurtleLogo";
import * as earnPageLanding from "./landing.css";

export function EarnPageLanding<Network extends number>({
  user,
  referral,
  network,
  openConnectionModal,
  signMessage,
  startSigning,
  onError,
  onSuccess,
}: EarnPageProps<Network>): React.ReactElement {
  const [signing, setSigning] = useState(false);

  const { data: organizations } = useOrganizations();

  const { data: organizationsDeals } = useOrganizationsDeals(
    organizations ? { organizationIds: organizations.organizations.map(o => o.id) } : undefined,
  );

  const {
    data: exists,
    refetch,
    isLoading: existsLoading,
  } = useExists(user ? { user } : undefined);

  const {
    data: prepareData,
  } = usePrepareSignup(user && !existsLoading && exists !== true ? { user } : undefined);

  const { mutateAsync } = useSignup((user && prepareData)
    ? {
        user,
        signupToken: prepareData.signup_token,
        referral,
        network: network.toString(),
      }
    : undefined);

  const combinedDeals = useMemo(() => {
    if (!organizationsDeals || !organizations)
      return null;

    return organizationsDeals.deals.map((deal) => {
      const organization = organizations.organizations.find(o => o.id === deal.organizationId);

      if (!organization)
        return null;

      return { deal, organization };
    })
      .filter(deal => deal !== null);
  }, [organizationsDeals, organizations]);

  const sign = async (): Promise<void> => {
    if (!prepareData)
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
  };

  const isCta = Boolean(user && exists !== false && !signing);

  return (
    <>
      <Z>
        <div className={earnPageLanding.banner}>
          <Heading level={2}>
            Euler Campaign
          </Heading>

          <Button asChild>
            <Link to="/deal/euler">
              Deposit
            </Link>
          </Button>
        </div>
      </Z>

      <Table
        title="Active Deals"
        items={combinedDeals}
        keyFn={({ deal }) => deal.id}
        searchItems={({ deal, organization }) => [deal.name, deal.description, organization.organizationType, organization.name]}
        orderBy={(a, b) => a.organization.name.localeCompare(b.organization.name)}
        render={({ item: { deal, organization } }) => {
          if (deal.status !== "active")
            return null;

          return (
            <Card key={deal.id}>
              <div className={earnPageLanding.cardHeader}>
                <div className={earnPageLanding.emptyLogo}>
                  <img src={deal.iconUrl || organization.iconUrl} alt={organization.name} />
                </div>

                <Heading level={3}>
                  {organization.name}
                </Heading>

                <div className={earnPageLanding.spacer} />

                <div className={earnPageLanding.boostContainer}>
                  <TurtleLogo style={{ width: "1.75rem", height: "1.75rem" }} />

                  <Text>
                    {deal.boostConfig?.turtleBoostPct ?? "-"}
                    % Boost
                  </Text>
                </div>
              </div>

              <Text>
                {organization.description}
              </Text>

              <div className={earnPageLanding.spacer} />

              <div className={earnPageLanding.cardActions}>
                <Badge>
                  {organization.organizationType}
                </Badge>

                {isCta && (
                  <Button asChild>
                    <a href={deal.dealUrl} target="_blank">
                      Deposit
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06" clipRule="evenodd" /></svg>
                    </a>
                  </Button>
                )}

                {!isCta && (
                  <Button
                    onClick={async () => {
                      if (signing)
                        return;

                      if (!user) {
                        openConnectionModal?.();
                        return;
                      }

                      if (exists === false) {
                        await sign();
                        return;
                      }

                      window.open(deal.dealUrl, "_blank");
                    }}
                  >
                    {signing && "Joining..."}

                    {user && exists === false && !signing && "Join Turtle"}

                    {!user && "Connect Wallet"}
                  </Button>
                )}
              </div>
            </Card>
          );
        }}
      />
    </>
  );
}
