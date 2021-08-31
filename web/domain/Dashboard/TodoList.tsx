import { Text, Flex } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import TodoItem from "./TodoItem";
import dayjs from "dayjs";
import useTodo from "../../hooks/data/useTodo";

let lastDateUsed: dayjs.Dayjs | null = null;

const TodoList: FunctionComponent = () => {
  const { todos } = useTodo();

  return (
    <Flex w="100%" flexDirection="column" mb={10} mt={10}>
      {todos.map((todo) => {
        const todoDate = dayjs.unix(parseInt(todo.date));

        const newDate = !lastDateUsed?.isSame(todoDate);
        if (newDate) lastDateUsed = todoDate;

        return (
          <>
            {newDate && (
              <Text mb={5} variant="title" fontSize="2.5rem">
                {todoDate.format("MMM DD, YYYY")}
              </Text>
            )}
            <TodoItem todo={todo} />
          </>
        );
      })}
    </Flex>
  );
};

export default TodoList;
