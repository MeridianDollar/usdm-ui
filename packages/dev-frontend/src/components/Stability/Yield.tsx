import React, { useEffect, useState } from "react";
import { Card, Paragraph, Text } from "theme-ui";
import { Decimal, LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";
import { InfoIcon } from "../InfoIcon";
import { Badge } from "../Badge";
import { fetchLqtyPrice, fetchMSTPrice } from "./context/fetchLqtyPrice";
import { useLiquity } from "../../hooks/LiquityContext";


const selector = ({ lusdInStabilityPool, remainingStabilityPoolLQTYReward }: LiquityStoreState) => ({
  lusdInStabilityPool,
  remainingStabilityPoolLQTYReward
});

const yearlyIssuanceFraction = 0.5;
const dailyIssuanceFraction = Decimal.from(1 - yearlyIssuanceFraction ** (1 / 365));
const dailyIssuancePercentage = dailyIssuanceFraction.mul(100);

export const Yield: React.FC = () => {
  const { collateral } = useLiquity();
  const { lusdInStabilityPool, remainingStabilityPoolLQTYReward } = useLiquitySelector(selector);

  const [lqtyPrice, setLqtyPrice] = useState<Decimal | undefined>(undefined);
  const hasZeroValue = remainingStabilityPoolLQTYReward.isZero || lusdInStabilityPool.isZero;

  useEffect(() => {
    (async () => {
      try {
        // const { lqtyPriceUSD } = await fetchLqtyPrice();
        const { lqtyPriceUSD } = await fetchMSTPrice();
        setLqtyPrice(lqtyPriceUSD);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (hasZeroValue || lqtyPrice === undefined) return null;

  const lqtyIssuanceOneDay = remainingStabilityPoolLQTYReward.mul(dailyIssuanceFraction);
  const lqtyIssuanceOneDayInUSD = lqtyIssuanceOneDay.mul(lqtyPrice);
  const aprPercentage = lqtyIssuanceOneDayInUSD.mulDiv(365 * 100, lusdInStabilityPool);
  const remainingLqtyInUSD = remainingStabilityPoolLQTYReward.mul(lqtyPrice);

  if (aprPercentage.isZero) return null;

  return (
    <Badge>
      <Text>{collateral === "TLOS" ? "WTLOS" : "MST"}  APR {aprPercentage.toString(2)}%</Text>
      <InfoIcon
        tooltip={
          <Card variant="tooltip" sx={{ width: ["220px", "518px"] }}>
            <Paragraph>
              An <Text sx={{ fontWeight: "bold" }}>estimate</Text> of the {collateral === "TLOS" ? "WTLOS" : "MST"} return on the USDM
              deposited to the Stability Pool over the next year, not including your {collateral} gains from
              liquidations.
            </Paragraph>
            <Paragraph sx={{ fontSize: "12px", fontFamily: "monospace", mt: 2 }}>
              ($REWARDS * DAILY_ISSUANCE% / DEPOSITED_USDM) * 365 * 100 ={" "}
              <Text sx={{ fontWeight: "bold" }}> APR</Text>
            </Paragraph>
            <Paragraph sx={{ fontSize: "12px", fontFamily: "monospace" }}>
              ($
              {remainingLqtyInUSD.shorten()} * {dailyIssuancePercentage.toString(4)}% / $
              {lusdInStabilityPool.shorten()}) * 365 * 100 =
              <Text sx={{ fontWeight: "bold" }}> {aprPercentage.toString(2)}%</Text>
            </Paragraph>
          </Card>
        }
      ></InfoIcon>
    </Badge>
  );
};
