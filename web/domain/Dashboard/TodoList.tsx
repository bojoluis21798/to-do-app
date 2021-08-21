import { Text, Flex } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { Todo } from "../../types/Todo";
import TodoItem from "./TodoItem";
import dayjs from "dayjs";

let lastDateUsed: string | null = null;

const TodoList: FunctionComponent<{ todo: Todo[] }> = ({ todo }) => {
  return (
    <Flex w="100%" flexDirection="column" mb={10} mt={10}>
      {todo.map((todo) => {
        const newDate = lastDateUsed !== todo.date;
        if (newDate) lastDateUsed = todo.date;

        return (
          <>
            {newDate && (
              <Text mb={5} variant="title" fontSize="2.5rem">
                {dayjs.unix(parseInt(todo.date)).format("MMM DD, YYYY")}
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
