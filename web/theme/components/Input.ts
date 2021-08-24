import { ComponentStyleConfig, DeepPartial } from "@chakra-ui/react";

const Input: DeepPartial<ComponentStyleConfig> = {
  baseStyle: {
    field: { color: "white", background: "rgba(0,0,0,0.2)" },
  },
  variants: {
    error: {
      field: {
        border: "1px solid",
        borderColor: "red.300",
      },
    },
    outline: {
      field: {
        fontWeight: "medium",
        borderColor: "blue.300",
        padding: "0.5rem",
        color: "blue.300",
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
  defaultProps: {
    variant: "",
  },
};

export default Input;
