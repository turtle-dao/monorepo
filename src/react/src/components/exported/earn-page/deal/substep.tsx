import type { ReactElement } from "react";
import { Link } from "@/components/ui/link";
import { Logo } from "@/components/ui/logo";
import { Text } from "@/components/ui/text";
import { Iterator } from "@/components/utils/iterator";
import { addressExplorer } from "@/lib/chains";
import { formatAddress, formatToken } from "@/lib/format";
import { earnTyped } from "@turtledev/api";
import { match } from "ts-pattern";
import * as routeCss from "./route.css";

export function Substep({
  substep,
  index,
}: {
  substep: earnTyped.RouterSubstep;
  index: number;
}): ReactElement {
  const { ui } = match(substep)
    .with({ kind: "swap" }, ({ from, to, protocol_asset }) => ({
      ui: (
        <Text>
          <Text bold asChild>
            <span>
              #
              {index + 1}
            </span>
          </Text>
          {" "}
          Swapping
          {" "}
          <Iterator
            items={from}
            keyFn={token => `${token.chain}-${token.address}`}
            render={({ item }) => (
              <Text bold asChild>
                <span>
                  {" "}
                  <Logo src={item.logos[0]} size="sm" inline />
                  {" "}
                  {item.symbol}
                </span>
              </Text>
            )}
            join={() => " and "}
          />
          {" for "}
          <Iterator
            items={to}
            keyFn={token => `${token.chain}-${token.address}`}
            render={({ item }) => (
              <Text asChild bold>
                <span>
                  {" "}
                  <Logo src={item.logos[0]} size="sm" inline />
                  {" "}
                  {item.symbol}
                </span>
              </Text>
            )}
            join={() => " and "}
          />
          {" "}
          using
          {" "}
          <Text bold asChild>
            <span>
              <Logo
                src={(protocol_asset && earnTyped.getAssetImage(protocol_asset)?.url) || ""}
                size="sm"
                inline
              />
              {" "}
              {protocol_asset?.name}
            </span>
          </Text>
        </Text>
      ),
    }))
    .with({ kind: "deposit" }, ({ from, amount, protocol_asset, vault }) => ({
      ui: (
        <Text>
          <Text bold asChild>
            <span>
              #
              {index + 1}
            </span>
          </Text>
          {" "}
          Depositing
          {" "}
          <Text bold asChild>
            <span>
              <Logo src={from[0].logos[0]} size="sm" inline />
              {" "}
              {formatToken(amount, from[0])}
              {" "}
              {from[0].symbol}
            </span>
          </Text>
          {" "}
          into
          {" "}
          <Text bold asChild>
            <span>
              <Logo
                src={(protocol_asset && earnTyped.getAssetImage(protocol_asset)?.url) || ""}
                size="sm"
                inline
              />
              {" "}
              {protocol_asset?.name}
            </span>
          </Text>
          {" "}
          at
          {" "}
          <Link href={addressExplorer(vault, 1)} target="_blank">
            {formatAddress(vault)}
          </Link>
        </Text>
      ),
    }))
    .exhaustive();

  return (
    <div className={routeCss.subRouteCard}>
      {ui}
    </div>
  );
}

export function SubstepMini({
  substep,
  index,
}: {
  substep: earnTyped.RouterSubstep;
  index: number;
}): ReactElement {
  const { mini } = match(substep)
    .with({ kind: "swap" }, ({ from, to }) => ({
      mini: (
        <Text>
          <Text bold asChild>
            <span>
              #
              {index + 1}
            </span>
          </Text>
          {" "}
          Swapped
          {" "}
          <Iterator
            items={from}
            keyFn={token => `${token.chain}-${token.address}`}
            render={({ item }) => (
              <Logo
                src={item.logos[0]}
                size="sm"
                inline
              />
            )}
          />
          {" "}
          to
          {" "}
          <Iterator
            items={to}
            keyFn={token => `${token.chain}-${token.address}`}
            render={({ item }) => (
              <Logo
                src={item.logos[0]}
                size="sm"
                inline
              />
            )}
          />
        </Text>
      ),
    }))
    .with({ kind: "deposit" }, ({ protocol_asset }) => ({
      mini: (
        <Text>
          <Text bold asChild>
            <span>
              #
              {index + 1}
            </span>
          </Text>
          {" "}
          Deposited into
          {" "}
          <Text bold asChild>
            <span>
              <Logo
                src={(protocol_asset && earnTyped.getAssetImage(protocol_asset)?.url) || ""}
                size="sm"
                inline
              />
              {" "}
              {protocol_asset?.name}
            </span>
          </Text>
        </Text>
      ),
    }))
    .exhaustive();

  return (
    <div className={routeCss.subRouteCard}>
      {mini}
    </div>
  );
}
