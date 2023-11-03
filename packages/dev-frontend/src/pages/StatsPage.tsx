import { Container } from "theme-ui";

import { Trove } from "../components/Trove/Trove";
import { Stability } from "../components/Stability/Stability";
import { SystemStats } from "../components/SystemStats";
import { PriceManager } from "../components/PriceManager";
import { Staking } from "../components/Staking/Staking";

export const StatsPage: React.FC = () => (
    <Container variant="columns">
        <Container variant="center">
            <SystemStats />
            {/* <PriceManager /> */}
        </Container>
    </Container>
);