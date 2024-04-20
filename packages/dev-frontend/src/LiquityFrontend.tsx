import React from "react";
import { Flex, Container } from "theme-ui";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Wallet } from "@ethersproject/wallet";

import { Decimal, Difference, Trove } from "@liquity/lib-base";
import { LiquityStoreProvider } from "@liquity/lib-react";

import { useLiquity } from "./hooks/LiquityContext";
import { TransactionMonitor } from "./components/Transaction";
import { UserAccount } from "./components/UserAccount";
import { SystemStatsPopup } from "./components/SystemStatsPopup";
import { Header } from "./components/Header";

import Sidebar from "./components/Sidebar/Sidebar";
import PageSwitcher from "./components/PageSwitcher/PageSwitcher";
import { Farm } from "./pages/Farm";
import { RiskyTrovesPage } from "./pages/RiskyTrovesPage";
import { RedemptionPage } from "./pages/RedemptionPage";
import { StakingPage } from "./pages/StakingPage";
import { StabilityPoolPage } from "./pages/StabilityPoolPage";
import { TrovePage } from "./pages/TrovePage";
import { StatsPage } from "./pages/StatsPage";
import { TroveViewProvider } from "./components/Trove/context/TroveViewProvider";
import { StabilityViewProvider } from "./components/Stability/context/StabilityViewProvider";
import { StakingViewProvider } from "./components/Staking/context/StakingViewProvider";
import { FarmViewProvider } from "./components/Farm/context/FarmViewProvider";

type LiquityFrontendProps = {
  loader?: React.ReactNode;
};
export const LiquityFrontend: React.FC<LiquityFrontendProps> = ({ loader }) => {
  const { collateral, account, provider, liquity, chainId } = useLiquity();
  // For console tinkering ;-)
  Object.assign(window, {
    account,
    provider,
    liquity,
    Trove,
    Decimal,
    Difference,
    Wallet
  });

  return (
    <LiquityStoreProvider {...{ loader }} store={liquity.store}>
      <Router>
        <TroveViewProvider>
          <StabilityViewProvider>
            <StakingViewProvider>
              <FarmViewProvider>
                <Flex sx={{ flexDirection: "column", minHeight: "100%", position: "relative"}}>
                  <div style={{ position: "relative", zIndex: 1010 }}>
                    <Header>
                      <UserAccount />
                      <SystemStatsPopup />
                    </Header>
                  </div> 
                  {/*
                  <Sidebar chainId={chainId} />
  */}
                  <Container
                    variant="main"
                    sx={{
                      display: "flex",
                      flexGrow: 1,
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <PageSwitcher/>
                    <Flex sx={{width: "100%", marginLeft:  ['0px', '100px'], marginRight:  ['0px', '20px', '100px']}}>
                    <Switch>
                      <Route path="/" exact>
                        <TrovePage />
                      </Route>
                      <Route path="/farm">
                        <Farm />
                      </Route>
                      <Route path="/risky-troves">
                        <RiskyTrovesPage />
                      </Route>
                      <Route path="/redemption">
                        <RedemptionPage />
                      </Route>
                      <Route path="/staking">
                        <StakingPage />
                      </Route>
                      <Route path="/pool">
                        <StabilityPoolPage />
                      </Route>
                      <Route path="/trove">
                        <TrovePage />
                      </Route>
                      <Route path="/stats">
                        <StatsPage />
                      </Route>
                    </Switch>
                    </Flex>
                  </Container>
                </Flex>
              </FarmViewProvider>
            </StakingViewProvider>
          </StabilityViewProvider>
        </TroveViewProvider>
      </Router>
      <TransactionMonitor />
    </LiquityStoreProvider>
  );
};
