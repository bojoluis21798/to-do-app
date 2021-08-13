import { extendTheme } from "@chakra-ui/react";
import Button from "./components/Button";
import Input from "./components/Input";
import Text from "./components/Text";
import global from "./global";

const theme = extendTheme({
  styles: {
    global,
  },
  components: {
    Button,
    Input,
    Text,
  },
});

export default theme;
