import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  components: {
    Input: {
      baseStyle: {
        color: "white",
      },
    },
  },
});

export default theme;
