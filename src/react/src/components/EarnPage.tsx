import { useMemo, useState } from "react";
import { useExists, usePartners, usePrepareSignup, useSignup } from "../hooks";
import { usePartnersDeals } from "../hooks/endpoints/usePartnersDeals";
import { useThemeApply } from "../theme/apply";
import { TurtleLogo } from "./TurtleLogo";

export function EarnPage({
  user,
  referral,
  network,
  enableSearch = false,
  disableText = false,
  openConnectionModal,
  signMessage,
  startSigning,
  onError,
  onSuccess,
}: {
  user?: string;
  referral?: string;
  network?: string;
  enableSearch?: boolean;
  disableText?: boolean;
  openConnectionModal?: () => void;
  signMessage: (message: string) => Promise<string>;
  startSigning?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}): React.ReactElement {
  const [search, setSearch] = useState("");
  const [signing, setSigning] = useState(false);

  const themeApply = useThemeApply();

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
              if (!enableSearch)
                return true;

              const searches = [deal.name, deal.description, partner.type, partner.name]
                .map(s => s.toLowerCase());

              return searches.some(s => s.includes(searchLower));
            })
            .toSorted(({ partner: partnerA }, { partner: partnerB }) => partnerA.name.localeCompare(partnerB.name))
        : null,
    [partnersDeals, partners, enableSearch, searchLower],
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
    <div style={themeApply.style} className="turtle-earn-container">
      {!disableText && (
        <>
          <div className="turtle-text-heading">Earn</div>
          <div className="turtle-text-subheading">
            Get extra rewards from DeFi protocols with Turtle.
          </div>
        </>
      )}

      {enableSearch && (
        <div className="turtle-earn-search">
          <input
            type="text"
            className="turtle-input"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      {filteredDeals === null && (
        <div className="turtle-earn-empty">
          <div className="turtle-text-subheading">
            Loading
          </div>
        </div>
      )}

      {filteredDeals !== null && filteredDeals.length === 0 && (
        <div className="turtle-earn-empty">
          <div className="turtle-text-subheading">
            No deals found
          </div>
        </div>
      )}

      <div className="turtle-earn-grid">
        {filteredDeals === null && Array.from({ length: 6 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index.toString()} className="turtle-earn-card turtle-earn-loading-card" />
        ))}

        {filteredDeals !== null && filteredDeals.map(({ deal, partner }) => {
          if (!partner || deal.status !== "active")
            return null;

          return (
            <div key={deal.id} className="turtle-earn-card">
              <div className="turtle-earn-card-header">
                <div className="turtle-logo" />

                <div className="turtle-text-subheading">
                  {partner.name}
                </div>

                <div className="turtle-spacer" />

                <div className="turtle-earn-boost-container">
                  <TurtleLogo style={{ width: "1.75rem", height: "1.75rem" }} />

                  <div className="turtle-text">
                    {deal.boost.boost_pct}
                    % Boost
                  </div>
                </div>
              </div>

              <p className="turtle-text-body">
                {partner.description}
              </p>

              <div className="turtle-spacer" />

              <div className="turtle-earn-card-actions">
                <div className="turtle-badge">
                  {partner.type}
                </div>

                {isCta && (
                  <a className="turtle-button" href={deal.url} target="_blank">
                    Deposit
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06" clipRule="evenodd" /></svg>
                  </a>
                )}

                {!isCta && (
                  <button
                    type="button"
                    className="turtle-button"
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
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
