import React from "react";
import { useLiquity } from "../../hooks/LiquityContext";
import { Decimal, StabilityDeposit, StabilityDepositChange } from "@liquity/lib-base";

import { COIN, GT } from "../../strings";
import { ActionDescription, Amount } from "../ActionDescription";

type StabilityActionDescriptionProps = {
  originalDeposit: StabilityDeposit;
  change: StabilityDepositChange<Decimal>;
};


export const StabilityActionDescription: React.FC<StabilityActionDescriptionProps> = ({
  originalDeposit,
  change
}) => {
  const { collateral } = useLiquity();
  const collateralGain = originalDeposit.collateralGain.nonZero?.prettify(4).concat({ collateral }.toString());
  const lqtyReward = originalDeposit.lqtyReward.nonZero?.prettify().concat(" ", collateral === "TLOS" ? "WTLOS" : collateral === "FUSE" ? "WFUSE" : GT);

  return (
    <ActionDescription>
      {change.depositLUSD ? (
        <>
          You are depositing{" "}
          <Amount>
            {change.depositLUSD.prettify()} {COIN}
          </Amount>{" "}
          in the Stability Pool
        </>
      ) : (
        <>
          You are withdrawing{" "}
          <Amount>
            {change.withdrawLUSD.prettify()} {COIN}
          </Amount>{" "}
          to your wallet
        </>
      )}
      {(collateralGain || lqtyReward) && (
        <>
          {" "}
          and claiming at least{" "}
          {collateralGain && lqtyReward ? (
            <>
              <Amount>{collateralGain}</Amount> and <Amount>{lqtyReward}</Amount>
            </>
          ) : (
            <Amount>{collateralGain ?? lqtyReward}</Amount>
          )}
        </>
      )}
      .
    </ActionDescription>
  );
};
