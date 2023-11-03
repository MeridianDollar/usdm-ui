import React from "react";
import { Box, Card, Container, Link, Paragraph } from "theme-ui";
import { SystemStats } from "../components/SystemStats";
import { Redemption } from "../components/Redemption/Redemption";
import { InfoMessage } from "../components/InfoMessage";
import { useLiquity } from "../hooks/LiquityContext";
import { Icon } from "../components/Icon";

const uniLink = `https://trade.meridianfinance.net/#/trade`;
// `https://app.Uniswap.cc/exchange/swap?inputCurrency=${lusdAddress}&outputCurrency=ETH`;

export const RedemptionPage: React.FC = () => {
  const {
    liquity: {
      connection: { addresses }
    },
    collateral
  } = useLiquity();

  return (
    <Container variant="columns">
      <Container variant="center">
        <Card>
          <Box sx={{ p: [2, 3] }}>
            <InfoMessage title="Bot functionality">
              <Paragraph>
                Redemptions are expected to be carried out by bots when arbitrage opportunities
                emerge.
              </Paragraph>
              <Paragraph sx={{ mt: 2 }}>
                Most of the time you will get a better rate for converting USDM to {collateral} on{" "}
                <Link href={uniLink} target="_blank">
                  Meridian Trade<Icon name="external-link-alt" size="xs" />
                </Link>{" "}
                or other exchanges.
              </Paragraph>
              <Paragraph sx={{ mt: 2 }}>
                <strong>Note</strong>: Redemption is not for repaying your loan. To repay your loan,
                adjust your Trove on the <Link href="#/">Dashboard</Link>.
              </Paragraph>
            </InfoMessage>
          </Box>
        </Card>
        <Redemption />
      </Container>
      {/*
      <Container variant="right">
        <SystemStats />
      </Container>
  */}
    </Container>

  );
};
