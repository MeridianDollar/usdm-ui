import React from "react";
import { NavLink as RouterLink, NavLinkProps as RouterLinkProps } from "react-router-dom";
import { NavLink as ThemeUINavLink, NavLinkProps as ThemeUILinkProps } from "theme-ui";

type CombinedProps = ThemeUILinkProps & RouterLinkProps<{}>;

export const ExactLink: React.FC<CombinedProps> = props => {
  return <RouterLink exact {...props} />;
};

export const Link: React.FC<CombinedProps> = (props) => {
  const isExternalLink =
    typeof props.to === "string" && (props.to.startsWith("http://") || props.to.startsWith("https://"));

  if (isExternalLink) {
    return (
      <ThemeUINavLink
        {...props}
        as="a"
        href={typeof props.to === "string" ? props.to : undefined}
        rel="noopener noreferrer"
        target="_blank"  // Add this line to open in a new page
        sx={{
          fontSize: "13px",
          fontWeight: "normal",
          fontFamily: "Arial",
          textDecoration: "none",
          color: "inherit",
          textTransform: "none",
          // Add any other custom styling you need here
        }}
      >
        {props.children}
      </ThemeUINavLink>
    );
  } else {
    return (
      <ThemeUINavLink
        {...props}
        as={ExactLink}
        sx={{
          fontSize: "13px",
          fontWeight: "normal",
          fontFamily: "Arial",
          textDecoration: "none",
          color: "inherit",
          textTransform: "none",
          // Add any other custom styling you need here
        }}
      >
        {props.children}
      </ThemeUINavLink>
    );
  }
};
