import { Container, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useTags from "../../hooks/data/useTags";
import Tags from "./Tags";
import TodoList from "./TodoList";

const Dashboard = () => {
  const { tags } = useTags();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [newTodo, setNewTodo] = useState<boolean>(false);

  useEffect(() => {
    setSelectedTags(tags.map((tag) => tag._id));
  }, [tags]);

  return (
    <Container maxW="container.lg" centerContent>
      <Flex
        mt="5rem"
        ml="1rem"
        mr="1rem"
        flexDirection="column"
        alignItems="center"
      >
        <Tags
          onSelectTag={(newSelectedTags) => setSelectedTags(newSelectedTags)}
          selectedTags={selectedTags}
          onNewTodo={() => setNewTodo(true)}
        />
        <TodoList
          newTodo={newTodo}
          onNewTodoSubmit={() => setNewTodo(false)}
          selectedTags={selectedTags}
        />
      </Flex>
    </Container>
  );
};

export default Dashboard;
