import React from "react";
import { Button, Flex } from "theme-ui";

import {
  Decimal,
  Decimalish,
  LiquityStoreState,
  LQTYStake,
  LQTYStakeChange
} from "@liquity/lib-base";

import { LiquityStoreUpdate, useLiquityReducer, useLiquitySelector } from "@liquity/lib-react";

import { GT, COIN } from "../../strings";

import { useStakingView } from "./context/StakingViewContext";
import { StakingEditor } from "./StakingEditor";
import { StakingManagerAction } from "./StakingManagerAction";
import { ActionDescription, Amount } from "../ActionDescription";
import { ErrorDescription } from "../ErrorDescription";
import { Approve } from "../../components/Farm/views/Approve";
import { useLiquity } from "../../hooks/LiquityContext";
import { useValidationState } from "../Farm/context/useValidationState";



const init = ({ lqtyStake }: LiquityStoreState) => ({
  originalStake: lqtyStake,
  editedLQTY: lqtyStake.stakedLQTY
});

type StakeManagerState = ReturnType<typeof init>;
type StakeManagerAction =
  | LiquityStoreUpdate
  | { type: "revert" }
  | { type: "setStake"; newValue: Decimalish };

const reduce = (state: StakeManagerState, action: StakeManagerAction): StakeManagerState => {
  // console.log(state);
  // console.log(action);

  const { originalStake, editedLQTY } = state;

  switch (action.type) {
    case "setStake":
      return { ...state, editedLQTY: Decimal.from(action.newValue) };

    case "revert":
      return { ...state, editedLQTY: originalStake.stakedLQTY };

    case "updateStore": {
      const {
        stateChange: { lqtyStake: updatedStake }
      } = action;

      if (updatedStake) {
        return {
          originalStake: updatedStake,
          editedLQTY: updatedStake.apply(originalStake.whatChanged(editedLQTY))
        };
      }
    }
  }

  return state;
};

const selectLQTYBalance = ({ lqtyBalance }: LiquityStoreState) => lqtyBalance;

type StakingManagerActionDescriptionProps = {
  originalStake: LQTYStake;
  change: LQTYStakeChange<Decimal>;
};

const StakingManagerActionDescription: React.FC<StakingManagerActionDescriptionProps> = ({
  originalStake,
  change
}) => {
  const result = useLiquity();
  const collateral = result?.collateral ?? "ETH";
  const stakeLQTY = change.stakeLQTY?.prettify().concat(" ", GT);
  const unstakeLQTY = change.unstakeLQTY?.prettify().concat(" ", GT);
  const collateralGain = originalStake.collateralGain.nonZero?.prettify(4).concat(" ", collateral);
  const lusdGain = originalStake.lusdGain.nonZero?.prettify().concat(" ", COIN);

  if (originalStake.isEmpty && stakeLQTY) {
    return (
      <ActionDescription>
        You are staking <Amount>{stakeLQTY}</Amount>.
      </ActionDescription>
    );
  }

  return (
    <ActionDescription>
      {stakeLQTY && (
        <>
          You are adding <Amount>{stakeLQTY}</Amount> to your stake
        </>
      )}
      {unstakeLQTY && (
        <>
          You are withdrawing <Amount>{unstakeLQTY}</Amount> to your wallet
        </>
      )}
      {(collateralGain || lusdGain) && (
        <>
          {" "}
          and claiming{" "}
          {collateralGain && lusdGain ? (
            <>
              <Amount>{collateralGain}</Amount> and <Amount>{lusdGain}</Amount>
            </>
          ) : (
            <>
              <Amount>{collateralGain ?? lusdGain}</Amount>
            </>
          )}
        </>
      )}
      .
    </ActionDescription>
  );
};

export const StakingManager: React.FC = () => {


  // const unstakeLQTY = change.unstakeLQTY?.prettify().concat(" ", GT);

  const { collateral } = useLiquity();
  const { dispatch: dispatchStakingViewAction } = useStakingView();
  const [{ originalStake, editedLQTY }, dispatch] = useLiquityReducer(reduce, init);
  const lqtyBalance = useLiquitySelector(selectLQTYBalance);

  const change = originalStake.whatChanged(editedLQTY);

  console.log(editedLQTY, "EDITED LQTY")

  const { isValid, hasApproved, isWithdrawing, amountChanged } = useValidationState(editedLQTY);

  console.log(isValid, hasApproved, isWithdrawing, amountChanged, "DATA")
  const [validChange, description] = !change
    ? [undefined, undefined]
    : change.stakeLQTY?.gt(lqtyBalance)
      ? [
        undefined,
        <ErrorDescription>
          The amount you're trying to stake exceeds your balance by{" "}
          <Amount>
            {change.stakeLQTY.sub(lqtyBalance).prettify()} {GT}
          </Amount>
          .
        </ErrorDescription>
      ]
      : [change, <StakingManagerActionDescription originalStake={originalStake} change={change} />];

  const makingNewStake = originalStake.isEmpty;

  let isIncreasing;

  if (change && change.stakeLQTY) {
    isIncreasing = true; 
  } else {
    isIncreasing = false;
  }


  return (
    <StakingEditor title={"Staking"} {...{ originalStake, editedLQTY, dispatch }}>
      {description ??
        (makingNewStake ? (
          <ActionDescription>Enter the amount of {GT} you'd like to stake.</ActionDescription>
        ) : (
          <ActionDescription>Adjust the {GT} amount to stake or withdraw.</ActionDescription>
        ))}


      <Flex variant="layout.actions">
        {hasApproved == false && isIncreasing == true && collateral === "TLOS" && (
          <Approve amount={lqtyBalance} />
        )}
        <>
          <Button
            variant="cancel"
            onClick={() => dispatchStakingViewAction({ type: "cancelAdjusting" })}
          >
            Cancel
          </Button>

          {validChange ? (
            <StakingManagerAction change={validChange}>Confirm</StakingManagerAction>
          ) : (
            <Button disabled>Confirm</Button>
          )}
        </>

      </Flex>
    </StakingEditor >

  );
};
