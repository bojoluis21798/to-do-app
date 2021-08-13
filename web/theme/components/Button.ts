import { ComponentStyleConfig, DeepPartial } from "@chakra-ui/react";

const Button: DeepPartial<ComponentStyleConfig> = {
  baseStyle: {
    fontWeight: "medium",
    padding: "0.5rem",
  },
  sizes: {
    contain: {
      w: "100%",
    },
  },
  variants: {
    white: {
      bg: "white",
      color: "black",
    },
    blue: {
      bg: "blue.300",
      color: "white",
    },
    outline: {
      _hover: {
        bg: "white",
        color: "black",
      },
      bg: "transparent",
      color: "white",
      border: "2px solid white",
    },
    success: {
      bg: "green.300",
      _disabled: {
        opacity: 1,
        bg: "green.300",
      },
      _hover: {
        opacity: 1,
        bg: "green.300",
      },
      color: "white",
    },
  },
  defaultProps: {
    variant: "blue",
  },
};

export default Button;