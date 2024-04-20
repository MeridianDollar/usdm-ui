import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Container, Flex } from "theme-ui";
import { Icon } from "./Icon";
import { LiquityLogo } from "./LiquityLogo";
import { Link } from "./Link";
import Sidebar from "./Sidebar/Sidebar";
import { useLiquity } from "../hooks/LiquityContext";

const logoHeight = "42px";

export const SideNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const { chainId } = useLiquity();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (overlay.current && !overlay.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };
    if (isVisible) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      // Cleanup listener
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isVisible]); 

  if (!isVisible) {
    return (
      <>
      <Button sx={{ display: ["flex", "none"] }} variant="icon" onClick={() => setIsVisible(true)}>
        <Icon name="bars" size="lg" />
      </Button>
      <Box sx={{ display: ["none", "flex"] }}>
        <Sidebar chainId={chainId} />
      </Box>
      </>
    );
  }
  return (
    <>
      <Container
        ref={overlay}
      >
        <Flex variant="layout.sidenav">
          <Sidebar chainId={chainId} />
        </Flex>
      </Container>
    </>
  );
};