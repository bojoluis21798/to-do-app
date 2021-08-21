import { EditIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Text,
  Grid,
  Checkbox,
  Select,
  IconButton,
  Input,
  Icon,
  Stack,
} from "@chakra-ui/react";
import React, { FunctionComponent, MouseEventHandler, useState } from "react";
import SelectDropdown from "../../components/SelectDropdown";
import { Todo } from "../../types/Todo";

const TodoItem: FunctionComponent<{ todo: Todo }> = ({ todo }) => {
  const [selected, setSelected] = useState(false);
  const [editing, setEditing] = useState(false);

  const toggleEdit: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setEditing(!editing);
  };

  return (
    <Grid
      bg="white"
      templateColumns="2fr 15fr 3fr 1fr 1fr"
      justifyItems="center"
      alignItems="center"
      gridColumnGap="1rem"
      p={5}
      borderRadius={5}
      cursor="pointer"
      onClick={() => setSelected((selected) => !selected)}
    >
      <Checkbox
        isChecked={selected}
        onChange={() => {
          setSelected((selected) => !selected);
        }}
      />
      <Input
        color="black"
        variant={editing ? "flushed" : "unstyled"}
        defaultValue={todo.name}
        onClick={(e) => e.stopPropagation()}
        disabled={!editing}
      />
      <SelectDropdown
        placeholder="Show all tags"
        onClick={(e) => e.stopPropagation()}
        onDelete={(key) => console.log(key)}
        deletable={editing}
        options={todo.tags.map((tags) => ({ key: tags._id, value: tags.name }))}
        emptyText="No tags"
      />
      <IconButton
        variant="unstyled"
        aria-label="Edit Icon"
        icon={!editing ? <EditIcon /> : <CloseIcon />}
        onClick={toggleEdit}
      />
      <IconButton
        variant="unstyled"
        aria-label="Delete Icon"
        icon={<DeleteIcon />}
      />
    </Grid>
  );
};

export default TodoItem;
