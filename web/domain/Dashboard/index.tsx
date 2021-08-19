import { Container, Flex } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { DashboardData } from "../../pages/dashboard";
import Tags from "./Tags";
import TodoList from "./TodoList";

const Dashboard: FunctionComponent<DashboardData> = ({
  data: { tags, todo },
}) => {
  console.log(tags, todo);

  return (
    <Container maxW="container.lg" centerContent>
      <Flex
        mt="5rem"
        ml="1rem"
        mr="1rem"
        flexDirection="column"
        alignItems="center"
      >
        <>
          <Tags tags={tags} />
          <TodoList todo={todo} />
        </>
      </Flex>
    </Container>
  );
};

export default Dashboard;
