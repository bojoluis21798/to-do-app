import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import Tags from "./Tags";
import TodoList from "./TodoList";

const Dashboard = () => {
  return (
    <Container maxW="container.lg" centerContent>
      <Flex
        mt="5rem"
        ml="1rem"
        mr="1rem"
        flexDirection="column"
        alignItems="center"
      >
        <Tags />
        <TodoList />
      </Flex>
    </Container>
  );
};

export default Dashboard;
