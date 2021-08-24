import { Text, Flex } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { Todo } from "../../types/Todo";
import TodoItem from "./TodoItem";
import dayjs from "dayjs";
import { Tag } from "../../types/Tag";

let lastDateUsed: dayjs.Dayjs | null = null;

const TodoList: FunctionComponent<{ todo: Todo[]; tags: Tag[] }> = ({
  todo,
  tags,
}) => {
  return (
    <Flex w="100%" flexDirection="column" mb={10} mt={10}>
      {todo.map((todo) => {
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
            <TodoItem todo={todo} tags={tags} />
          </>
        );
      })}
    </Flex>
  );
};

export default TodoList;
