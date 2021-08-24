import { ComponentStyleConfig, DeepPartial } from "@chakra-ui/react";

const outlineBase = {
  _hover: {
    bg: "white",
    color: "black",
  },
  bg: "transparent",
  color: "white",
  border: "2px solid white",
};

const Button: DeepPartial<ComponentStyleConfig> = {
  baseStyle: {
    fontWeight: "medium",
    padding: "0.5rem 0",
    bg: "blue.300",
    color: "white",
    _focus: {
      boxShadow: "none",
    },
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
    outline: outlineBase,
    "outline-blue": {
      ...outlineBase,
      _hover: {
        bg: "blue.300",
        color: "white",
      },
      color: "blue.300",
      border: "2px solid",
      borderColor: "blue.300",
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
    variant: "",
  },
};

export default Button;
