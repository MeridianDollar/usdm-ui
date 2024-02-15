import React from "react";
import { Box, Card, Container, Link, Paragraph } from "theme-ui";
import { SystemStats } from "../components/SystemStats";
import { Redemption } from "../components/Redemption/Redemption";
import { InfoMessage } from "../components/InfoMessage";
import { useLiquity } from "../hooks/LiquityContext";
import { Icon } from "../components/Icon";

const uniLink = `https://app.uniswap.org/swap?exactField=input&exactAmount=0&outputCurrency=0x2F3b1A07E3eFb1fCc64BD09b86bD0Fa885D93552&chain=base`;
const swapsicleLink = `https://telos.swapsicle.io/swap?outputCurrency=0x568524DA340579887db50Ecf602Cd1BA8451b243&inputCurrency=0x8D97Cea50351Fb4329d591682b148D43a0C3611b`;
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
                <Link href={collateral === "TLOS" ? swapsicleLink : uniLink} target="_blank">
                  {collateral === "TLOS" ? "Swapsicle" : "Uniswap"}<Icon name="external-link-alt" size="xs" />
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
