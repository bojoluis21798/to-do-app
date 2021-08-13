import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Home: React.FunctionComponent = ({ children }) => {
  return (
    <Flex
      bg="blue.900"
      justifyContent="space-around"
      alignItems="center"
      h="100vh"
    >
      <Flex
        direction="column"
        h="100%"
        alignItems="center"
        justifyContent="center"
        flexBasis="30rem"
      >
        <Text variant="title">Just a simple to do app</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" direction="column">
        <Flex
          flexDirection="column"
          alignItems="center"
          backgroundColor="rgba(0,0,0,0.2)"
          p="5rem"
          w="30rem"
          borderRadius={10}
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
