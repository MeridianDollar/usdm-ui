import React from "react";
import { Box, Image } from "theme-ui";

type LiquityLogoProps = React.ComponentProps<typeof Box> & {
  height?: number | string;
};

export const LiquityLogo: React.FC<LiquityLogoProps> = ({ height, ...boxProps }) => (
  <Box sx={{ lineHeight: 0, pb: 3 }} {...boxProps}>
    <a href="https://www.meridianfinance.net" target="_self" rel="noopener noreferrer">
      <Image src="./meridian_logo.svg" sx={{ height }} />
    </a>
  </Box>
);
