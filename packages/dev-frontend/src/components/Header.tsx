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
      <Container variant="header" style={{ position: "relative", zIndex: 1010, boxShadow: "0 8px 9px -3px rgba(51, 51, 51, 0.3)"}}>
      <Flex sx={{ alignItems: "flexStart", flex: 1, position: 'relative' }}>
    <LiquityLogo sx={{
        height: logoHeight,
        width: "130px",
        position: 'absolute',  // Change position to absolute
        left: '0',           // Set left to 15px
        top: '50%',             // Center vertically
        transform: 'translateY(-50%)', // Adjust vertical centering
        zIndex: 1005
    }} />
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

