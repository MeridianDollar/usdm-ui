import React, { useState, useRef } from "react";
import { Box, Button, Container, Flex } from "theme-ui";
import { Icon } from "./Icon";
import { LiquityLogo } from "./LiquityLogo";
import { Link } from "./Link";

const logoHeight = "42px";

const navItemStyle = {
  textDecoration: 'none',
  color: 'inherit',
  mb: 2,           // Some margin-bottom for space between items
  display: 'block' // Ensure they are block-level elements for consistent spacing
};

export const SideNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const [submenuVisible, setSubmenuVisible] = useState(false); // Add this line


  if (!isVisible) {
    return (
      <Button sx={{ display: ["flex", "none"] }} variant="icon" onClick={() => setIsVisible(true)}>
        <Icon name="bars" size="lg" />
      </Button>
    );
  }
  return (
    <>
      {/* ... (rest of the code) */}
      <Container
        variant="infoOverlay"
        ref={overlay}
        onClick={e => {
          if (e.target === overlay.current) {
            setIsVisible(false);
          }
        }}
      >
        <Flex variant="layout.sidenav">
          {/* ... */}
          <Box as="nav" sx={{ m: 3, mt: 1, p: 0 }} onClick={() => setIsVisible(false)}>
            <Link to="/" sx={navItemStyle}>Mint</Link>
            <Link to="/risky-troves" sx={navItemStyle}>Risky Troves</Link>
            <Link to="/redemption" sx={navItemStyle}>Redemption</Link>

            <Link
              as="a"
              to="https://trade.meridianfinance.net/#/trade"
              rel="noopener noreferrer"
              sx={navItemStyle}
            >
              Trade
            </Link>
          </Box>
        </Flex>
      </Container>
    </>
  );
};