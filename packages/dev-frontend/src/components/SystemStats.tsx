import React, { useState, useEffect } from "react";
import { Card, Heading, Link, Box, Text } from "theme-ui";
import { AddressZero } from "@ethersproject/constants";
import { Decimal, Percent, LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";
import { fetchMSTPrice, fetchMSTMcap, fetchMeridianTVL } from "./Stability/context/fetchLqtyPrice";

import { useLiquity } from "../hooks/LiquityContext";
import { COIN, GT } from "../strings";
import { Statistic } from "./Statistic";

const selectBalances = ({ accountBalance, lusdBalance, lqtyBalance }: LiquityStoreState) => ({
  accountBalance,
  lusdBalance,
  lqtyBalance
});


const GitHubCommit: React.FC<{ children?: string }> = ({ children }) =>
  children?.match(/[0-9a-f]{40}/) ? (
    <Link href={`https://github.com/liquity/dev/commit/${children}`}>{children.substr(0, 7)}</Link>
  ) : (
    <>unknown</>
  );

type SystemStatsProps = {
  variant?: string;
  showBalances?: boolean;
};

const select = ({
  numberOfTroves,
  price,
  total,
  lusdInStabilityPool,
  borrowingRate,
  redemptionRate,
  totalStakedLQTY,
  frontend
}: LiquityStoreState) => ({
  numberOfTroves,
  price,
  total,
  lusdInStabilityPool,
  borrowingRate,
  redemptionRate,
  totalStakedLQTY,
  kickbackRate: frontend.status === "registered" ? frontend.kickbackRate : null
});



export const SystemStats: React.FC<SystemStatsProps> = ({ variant = "info", showBalances }) => {
  const {
    liquity: {
      connection: { version: contractsVersion, deploymentDate, frontendTag }
    },
    collateral
  } = useLiquity();

  const [lqtyPrice, setLqtyPrice] = useState<Decimal | undefined>(undefined);
  const [mstMcap, setMSTMcap] = useState<Decimal | undefined>(undefined);
  const [TVLUSD, setTVLUSD] = useState<Decimal | undefined>(undefined);

  const Balances: React.FC = () => {
    const { accountBalance, lusdBalance, lqtyBalance } = useLiquitySelector(selectBalances);

    return (
      <Box sx={{ mb: 3 }}>
        <Heading>My Account Balances</Heading>
        <Statistic name={collateral}> {accountBalance.prettify(4)}</Statistic>
        <Statistic name={COIN}> {lusdBalance.prettify()}</Statistic>
        <Statistic name={GT}>{lqtyBalance.prettify()}</Statistic>
      </Box>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        // const { lqtyPriceUSD } = await fetchLqtyPrice();
        const { lqtyPriceUSD } = await fetchMSTPrice();
        const { MstMcapUSD } = await fetchMSTMcap();
        const { TVLUSD } = await fetchMeridianTVL();

        setLqtyPrice(lqtyPriceUSD);
        setMSTMcap(MstMcapUSD);
        setTVLUSD(TVLUSD);

      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  //  if (lqtyPrice === undefined) return null;

  const {
    numberOfTroves,
    price,
    lusdInStabilityPool,
    total,
    borrowingRate,
    totalStakedLQTY,
    kickbackRate
  } = useLiquitySelector(select);

  const lusdInStabilityPoolPct =
    total.debt.nonZero && new Percent(lusdInStabilityPool.div(total.debt));
  const totalCollateralRatioPct = new Percent(total.collateralRatio(price));
  const borrowingFeePct = new Percent(borrowingRate);
  const kickbackRatePct = frontendTag === AddressZero ? "100" : kickbackRate?.mul(100).prettify();

  let decimals: number;

  if (collateral === "TLOS") {
    decimals = 4;
  } else {
    decimals = 2;
  }

  return (
    <Card {...{ variant }}>
      {showBalances && <Balances />}

      <Heading>Meridian statistics</Heading>

      <Heading as="h2" sx={{ mt: 3, fontWeight: "body" }}>
        Protocol
      </Heading>

      <Statistic
        name="Borrowing Fee"
        tooltip="The Borrowing Fee is a one-off fee charged as a percentage of the borrowed amount (in USDM) and is part of a Trove's debt. The fee varies between 0.5% and 5% depending on USDM redemption volumes."
      >
        {borrowingFeePct.toString(2)}
      </Statistic>

      <Statistic
        name="TVL"
        tooltip={`The Total Value Locked (TVL) is the total value  locked as collateral in the system, given in ${collateral} and USD.`}
      >
        {total.collateral.shorten()} <Text sx={{ fontSize: 1 }}>&nbsp;{collateral}</Text>
        <Text sx={{ fontSize: 1 }}>
          &nbsp;(${Decimal.from(total.collateral.mul(price)).shorten()})
        </Text>
      </Statistic>
      <Statistic name="Troves" tooltip="The total number of active Troves in the system.">
        {Decimal.from(numberOfTroves).prettify(0)}
      </Statistic>
      <Statistic name="USDM supply" tooltip="The total USDM minted by the Meridian Protocol.">
        {total.debt.shorten()}
      </Statistic>
      {lusdInStabilityPoolPct && (
        <Statistic
          name="USDM in Stability Pool"
          tooltip="The total USDM currently held in the Stability Pool, expressed as an amount and a fraction of the USDM supply.
        "
        >
          {lusdInStabilityPool.shorten()}
          <Text sx={{ fontSize: 1 }}>&nbsp;({lusdInStabilityPoolPct.toString(1)})</Text>
        </Statistic>
      )}
      <Statistic
        name="Staked MST"
        tooltip="The total amount of MST that is staked for earning fee revenue."
      >
        {totalStakedLQTY.shorten()}
      </Statistic>
      <Statistic
        name="Total Collateral Ratio"
        tooltip={`The ratio of the Dollar value of the entire system collateral at the current ${collateral}:USD price, to the entire system debt.`}
      >
        {totalCollateralRatioPct.prettify()}
      </Statistic>
      <Statistic
        name={`${collateral} Oracle Price`}
        tooltip={`Latest ${collateral} Price as reported by DIA Oracle`}
      >
        &nbsp;${Decimal.from(price).shorten_4(decimals)}
      </Statistic>
      <Statistic
        name="MST Price"
        tooltip={
          <>
            Price of MST trading on{" "}
            <Link href="https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&outputCurrency=0x2F3b1A07E3eFb1fCc64BD09b86bD0Fa885D93552" target="_blank" rel="noopener noreferrer">
              Uniswap
            </Link>
          </>
        }
      >
        &nbsp;${Decimal.from(lqtyPrice || 0).shorten_4(4)}
      </Statistic>
      <Statistic
        name="MST Market Cap"
        tooltip="Total market capitalisation of MST, based on the tokens current circulating supply and price."
      >
        &nbsp;${Decimal.from(mstMcap || 0).shorten()}
      </Statistic>

      <Statistic
        name="Total TVL"
        tooltip="Total value locked in Meridian across all chains."
      >
        &nbsp;${Decimal.from(TVLUSD || 0).shorten()}
      </Statistic>
      <Statistic
        name="Recovery Mode"
        tooltip="Recovery Mode is activated when the Total Collateral Ratio (TCR) falls below 150%. When active, your Trove can be liquidated if its collateral ratio is below the TCR. The maximum collateral you can lose from liquidation is capped at 110% of your Trove's debt. Operations are also restricted that would negatively impact the TCR.
        "
      >
        {total.collateralRatioIsBelowCritical(price) ? <Box color="danger">Yes</Box> : "No"}
      </Statistic>

      { }
      {/*
      <Heading as="h2" sx={{ mt: 3, fontWeight: "body" }}>
        Frontend
      </Heading>
      
      {kickbackRatePct && (
        <Statistic
          name="Kickback Rate"
          tooltip="A rate between 0 and 100% set by the Frontend Operator that determines the fraction of MST that will be paid out as a kickback to the Stability Providers using the frontend."
        >
          {kickbackRatePct}%
        </Statistic>
      )}
      */}
      {/*}
      <Box sx={{ mt: 3, opacity: 0.66 }}>
        <Box sx={{ fontSize: 0 }}>
          Contracts version: <GitHubCommit>{contractsVersion}</GitHubCommit>
        </Box>
        <Box sx={{ fontSize: 0 }}>Deployed: {deploymentDate.toLocaleString()}</Box>
        <Box sx={{ fontSize: 0 }}>
          Frontend version:{" "}
          {process.env.NODE_ENV === "development" ? (
            "development"
          ) : (
            <GitHubCommit>{process.env.REACT_APP_VERSION}</GitHubCommit>
          )}
        </Box>
      </Box>
      */}
    </Card>
  );
};
