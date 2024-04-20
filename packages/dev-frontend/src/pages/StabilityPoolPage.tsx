import { Container } from "theme-ui";
import { useState } from "react";
import { CSSProperties } from "react";

import { Trove } from "../components/Trove/Trove";
import { Stability } from "../components/Stability/Stability";
import { PriceManager } from "../components/PriceManager";
import { Staking } from "../components/Staking/Staking";
import { SystemStats } from "../components/SystemStats";
import { useLiquity } from "../hooks/LiquityContext";


const PageContainer: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "10vh",
};

const Submenu: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    background: "#00356e",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
};

const SubmenuItem: CSSProperties = {
    margin: "0 20px",
    cursor: "pointer",
};

export const StabilityPoolPage: React.FC = () => {
    const { collateral } = useLiquity();
    const [activeTab, setActiveTab] = useState("Stability Pool");

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "Trove":
                return <Trove />;
            case "Stability Pool":
                return <Stability />;
            case "Staking":
                return <Staking />;
            default:
                return <Trove />;
        }
    };

    return (
        <Container>
            <Container variant="center">
                {renderContent()}
            </Container>
            <Container variant="center">
                <SystemStats />
                {/* <PriceManager /> */}
            </Container>
        </Container>
    );
};
