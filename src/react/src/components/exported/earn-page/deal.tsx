import type { ReactElement } from "react";
import type { EarnPageProps } from "./types";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { Heading, Text } from "@/components/ui/text";
import * as deal from "./deal.css";

const ensoAPI = "f3b95773-ecc3-4d24-b794-b85ff0b92e04";

const eulerVaults = [
  "0xD8b27CF359b7D15710a5BE299AF6e7Bf904984C2",
  "0xe0a80d35bB6618CBA260120b279d357978c42BCE",
  "0xbC35161043EE2D74816d421EfD6a45fDa73B050A",
];

export function EarnPageDeal({
  id,
}: EarnPageProps & { id: string }): ReactElement {
  return (
    <Flex>
      <div className={deal.actionCard}>
        <Text bold>Deposit</Text>

        <Button justify="center">Deposit</Button>
      </div>

      <div className={deal.content}>
        <Heading level={1}>Euler Vaults</Heading>
      </div>
    </Flex>
  );
}
