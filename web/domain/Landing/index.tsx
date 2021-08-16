import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Home: React.FunctionComponent = ({ children }) => {
  return (
    <Flex h="100vh" justifyContent={"space-around"} alignItem={"center"}>
      <Flex
        direction="column"
        h="100%"
        alignItems="center"
        justifyContent="center"
        flexBasis="30rem"
      >
        <Text variant="title">Just a simple to do app</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Box
          backgroundColor="rgba(0,0,0,0.2)"
          p="5rem"
          w="30rem"
          borderRadius={10}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
