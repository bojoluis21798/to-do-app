import { Box, Flex } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import TodoItem from "./TodoItem";
import useTodo from "../../hooks/data/useTodo";

type TodoListProps = {
  selectedTags: string[];
  newTodo: boolean;
  onNewTodoSubmit: () => void;
};

const TodoList: FunctionComponent<TodoListProps> = ({
  selectedTags,
  newTodo,
  onNewTodoSubmit,
}) => {
  const { todos } = useTodo();

  return (
    <Flex w="100%" flexDirection="column" mb={10} mt={10}>
      {todos.map((todo) => {
        return (
          (todo.tags.length === 0 ||
            todo.tags.some((tag) => selectedTags.includes(tag._id))) && (
            <Box mb="2">
              <TodoItem todo={todo} />
            </Box>
          )
        );
      })}

      {newTodo && (
        <Box mb="2">
          <TodoItem newTodo onNewTodoSubmit={onNewTodoSubmit} />
        </Box>
      )}
    </Flex>
  );
};

export default TodoList;
