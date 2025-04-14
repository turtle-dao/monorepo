import type { EarnPageProps } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ComboBox } from "@/components/ui/combo-box";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import { Heading, Text } from "@/components/ui/text";
import { Z } from "@/components/ui/z";
import { useExists, usePartners, usePrepareSignup, useSignup } from "@/hooks";
import { usePartnersDeals } from "@/hooks/endpoints/usePartnersDeals";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { FunnelIcon } from "../../icons/funnel";
import { TurtleLogo } from "../TurtleLogo";
import * as earnPageLanding from "./landing.css";

export function EarnPageLanding({
  user,
  referral,
  network,
  openConnectionModal,
  signMessage,
  startSigning,
  onError,
  onSuccess,
}: EarnPageProps): React.ReactElement {
  const [search, setSearch] = useState("");
  const [signing, setSigning] = useState(false);
  const [partnerType, setPartnerType] = useState<string | null>(null);

  const { data: partners } = usePartners();

  const { data: partnersDeals } = usePartnersDeals(
    partners ? { partnerIds: partners.partners.map(p => p.id) } : undefined,
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
        network,
      }
    : undefined);

  const searchLower = useMemo(() => search.toLowerCase(), [search]);

  const partnerTypes = useMemo(() => {
    if (!partners)
      return [null];

    const types = new Set<string>();

    for (const partner of partners.partners) {
      if (partner.type)
        types.add(partner.type);
    }

    return [null, ...types];
  }, [partners]);

  const filteredDeals = useMemo(
    () =>
      (partnersDeals !== undefined && partnersDeals !== null && partners !== undefined && partners !== null)
        ? partnersDeals.deals
            .map((deal) => {
              const partner = partners?.partners.find(p => p.id === deal.partner_id);

              if (!partner)
                return null;

              return { deal, partner };
            })
            .filter(deal => deal !== null)
            .filter(({ deal, partner }) => {
              const searches = [deal.name, deal.description, partner.type, partner.name]
                .map(s => s.toLowerCase());

              return searches.some(s =>
                s.includes(searchLower)
                && (!partnerType || partner.type === partnerType));
            })
            .toSorted(({ partner: partnerA }, { partner: partnerB }) => partnerA.name.localeCompare(partnerB.name))
        : null,
    [partnersDeals, partners, searchLower, partnerType],
  );

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

      <div className={earnPageLanding.tableCard}>
        <div className={earnPageLanding.tableHeader}>
          <Flex items="center" gap="sm">
            <Text bold>Active Deals</Text>

            <div />

            <ComboBox
              title="Filter by type"
              value={[partnerType, setPartnerType]}
              options={partnerTypes}
              itemKey={t => t ?? "all"}
              render={({ value }) => <>{value ?? "All"}</>}
            >
              <Button color="ghost" size="sm">
                <FunnelIcon />
                {partnerType ?? "All"}
              </Button>
            </ComboBox>
          </Flex>

          <Flex items="center" gap="sm">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={earnPageLanding.search}
            />
          </Flex>
        </div>

        <div className={earnPageLanding.tableContent}>
          <div className={earnPageLanding.grid}>
            {filteredDeals === null && Array.from({ length: 6 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index.toString()} className={earnPageLanding.loadingCard} />
            ))}

            {filteredDeals !== null && filteredDeals.map(({ deal, partner }) => {
              if (!partner || deal.status !== "active")
                return null;

              return (
                <Card key={deal.id}>
                  <div className={earnPageLanding.cardHeader}>
                    <div className={earnPageLanding.emptyLogo} />

                    <Heading level={3}>
                      {partner.name}
                    </Heading>

                    <div className={earnPageLanding.spacer} />

                    <div className={earnPageLanding.boostContainer}>
                      <TurtleLogo style={{ width: "1.75rem", height: "1.75rem" }} />

                      <Text>
                        {deal.boost.boost_pct}
                        % Boost
                      </Text>
                    </div>
                  </div>

                  <Text>
                    {partner.description}
                  </Text>

                  <div className={earnPageLanding.spacer} />

                  <div className={earnPageLanding.cardActions}>
                    <Badge>
                      {partner.type}
                    </Badge>

                    {isCta && (
                      <Button asChild>
                        <a href={deal.url} target="_blank">
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

                          window.open(deal.url, "_blank");
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
            })}
          </div>

          {filteredDeals !== null && filteredDeals.length === 0 && (
            <div className={earnPageLanding.empty}>
              <Heading level={3}>
                No deals found
              </Heading>
            </div>
          )}

          {filteredDeals === null && (
            <div className={earnPageLanding.empty}>
              <Heading level={3}>
                Loading
              </Heading>
            </div>
          )}
        </div>

        <div className={earnPageLanding.tableFooter}></div>
      </div>

      <div className={earnPageLanding.tablePadding} />
    </>
  );
}
