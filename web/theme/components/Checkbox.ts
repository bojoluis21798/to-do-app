import { DeepPartial, ComponentStyleConfig } from "@chakra-ui/react";

const Checkbox: DeepPartial<ComponentStyleConfig> = {
  variants: {
    readonly: {
      control: {
        _disabled: {
          bg: "white",
          borderColor: "gray.200",
        },
        _checked: {
          _disabled: {
            bg: "blue.400",
            borderColor: "blue.400",
            color: "white",
          },
        },
        cursor: "pointer",
      },
    },
  },
};

export default Checkbox;
