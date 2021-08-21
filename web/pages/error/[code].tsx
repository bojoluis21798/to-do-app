import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Error = () => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Text variant="error" fontSize="2rem">
        {code || 500}
      </Text>
      <Text variant="error" fontSize="3rem" mt="1rem" pt="1rem">
        An Error has occurred
      </Text>
    </Flex>
  );
};

export default Error;
