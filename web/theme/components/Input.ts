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
  },
  defaultProps: {
    variant: "",
  },
};

export default Input;
