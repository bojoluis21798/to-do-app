import { ComponentStyleConfig, DeepPartial } from "@chakra-ui/react";

const Text: DeepPartial<ComponentStyleConfig> = {
  variants: {
    error: {
      color: "red.300",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      color: "blue.100",
    },
  },
};

export default Text;
