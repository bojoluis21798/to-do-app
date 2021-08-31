import { EditIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Grid, Checkbox, IconButton, Input } from "@chakra-ui/react";
import React, { FunctionComponent, MouseEventHandler, useState } from "react";
import SelectDropdown, {
  OptionsType,
  SelectOption,
} from "../../components/SelectDropdown";
import { Todo } from "../../types/Todo";
import _ from "lodash";
import useTodo from "../../hooks/data/useTodo";
import useTags from "../../hooks/data/useTags";

const TodoItem: FunctionComponent<{ todo: Todo }> = ({ todo }) => {
  const { addTagtoTodo, deleteTagFromTodo, changeTodoName, submitEdits } =
    useTodo();
  const { tags } = useTags();

  const [selected, setSelected] = useState(false);
  const [editing, setEditing] = useState(false);

  const onAddTag = (newTag: SelectOption) => {
    const tag = tags.find((tag) => tag._id === newTag.key);

    if (tag) addTagtoTodo(todo._id, tag);
  };

  const onDeleteTag = (tagToDelete: SelectOption) => {
    const tag = tags.find((tag) => tagToDelete.key === tag._id);

    if (tag) deleteTagFromTodo(todo._id, tag._id);
  };

  const handleTodoNameChange = (name: string) => changeTodoName(todo._id, name);

  const toggleEdit: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (editing) {
      submitEdits(todo._id);
    }

    setEditing((editing) => !editing);
  };

  const tagOptions = [
    ...todo.tags.map((tag) => ({
      key: tag._id,
      value: tag.name,
      type: OptionsType.DELETEABLE,
    })),
    ...(editing
      ? tags
          .filter((tag) => !todo.tags.map((tag) => tag._id).includes(tag._id))
          .map((tag) => ({
            key: tag._id,
            value: tag.name,
            type: OptionsType.ADDABLE,
          }))
      : []),
  ];

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
        value={todo.name}
        onChange={(e) => handleTodoNameChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        disabled={!editing}
      />

      <SelectDropdown
        placeholder="Show all tags"
        onClick={(e) => e.stopPropagation()}
        onDelete={onDeleteTag}
        onAdd={onAddTag}
        editable={editing}
        options={tagOptions}
        emptyText="No tags"
      />

      <IconButton
        variant="unstyled"
        aria-label="Edit Icon"
        icon={!editing ? <EditIcon /> : <ExternalLinkIcon />}
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
