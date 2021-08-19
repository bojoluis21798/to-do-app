import { EditIcon, DeleteIcon, Icon } from "@chakra-ui/icons";
import { Text, Grid, Checkbox, Select } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { Todo } from "../../types/Todo";

const TodoItem: FunctionComponent<{ todo: Todo }> = ({ todo }) => {
  return (
    <Grid
      bg="white"
      templateColumns="2fr 20fr 2fr 1fr 1fr"
      justifyItems="center"
      alignItems="center"
      gridColumnGap="1rem"
      p={5}
      borderRadius={5}
    >
      <Checkbox />
      <Text justifySelf="start">{todo.name}</Text>
      <Select>
        {todo.tags.map((tag) => (
          <option>{tag.name}</option>
        ))}
      </Select>
      <Icon as={EditIcon} />
      <Icon as={DeleteIcon} />
    </Grid>
  );
};

export default TodoItem;
