import React from "react";
import { LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";
import { Container, Flex, Box } from "theme-ui";
import { AddressZero } from "@ethersproject/constants";
import { useLiquity } from "../hooks/LiquityContext";

import { LiquityLogo } from "./LiquityLogo";
import { Nav } from "./Nav";
import { SideNav } from "./SideNav";

const logoHeight = "35px";

const select = ({ frontend }: LiquityStoreState) => ({
  frontend
});

export const Header: React.FC = ({ children }) => {
  const {
    config: { frontendTag }
  } = useLiquity();
  const { frontend } = useLiquitySelector(select);
  const isFrontendRegistered = frontendTag === AddressZero || frontend.status === "registered";

  return (
    <>
      <Container variant="header" style={{ position: "relative", zIndex: 1010}}>
        <Flex sx={{ alignItems: "center", flex: 1 }}>
          <LiquityLogo sx={{ height: logoHeight, width: "130px", marginLeft: "-35px", marginTop: "-12px", position: 'relative', zIndex: 1005 }} /> {/* Adjust the marginTop as needed */}

          <Box
            sx={{
              mx: [0, 2],
              width: "0px",
              height: "100%",
              borderLeft: ["none", "1px solid lightgrey"]
            }}
          />
        </Flex>
        {isFrontendRegistered && (
          <Nav />
        )}

        {children}
      </Container>
      {isFrontendRegistered && (
          <SideNav  />
      )}
    </>
  );
};

