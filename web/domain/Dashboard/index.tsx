import { Container, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import useFetcher from "../../hooks/useFetcher";
import Tags from "./Tags";
import TodoList from "./TodoList";

const Dashboard = () => {
  const { requestStatus: tagsStatus } = useFetcher("/tags");
  const { requestStatus: toDoStatus } = useFetcher("/to-do");

  return (
    <Container maxW="container.lg" centerContent>
      <Flex
        mt="5rem"
        ml="1rem"
        mr="1rem"
        flexDirection="column"
        alignItems="center"
      >
        {[tagsStatus, toDoStatus].every((status) => status === "loading") ? (
          <Spinner />
        ) : (
          <>
            <Tags />
            <TodoList />
          </>
        )}
      </Flex>
    </Container>
  );
};

export default Dashboard;
