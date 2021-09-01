import { Text, Flex } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import TodoItem from "./TodoItem";
import dayjs from "dayjs";
import useTodo from "../../hooks/data/useTodo";

const TodoList: FunctionComponent = () => {
  const { todos } = useTodo();

  return (
    <Flex w="100%" flexDirection="column" mb={10} mt={10}>
      {todos.map((todo) => {
        return (
          <>
            <TodoItem todo={todo} />
          </>
        );
      })}
    </Flex>
  );
};

export default TodoList;
