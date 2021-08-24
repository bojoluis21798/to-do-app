import { EditIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Grid, Checkbox, IconButton, Input } from "@chakra-ui/react";
import React, { FunctionComponent, MouseEventHandler, useState } from "react";
import SelectDropdown, { OptionsType } from "../../components/SelectDropdown";
import { Tag } from "../../types/Tag";
import { Todo } from "../../types/Todo";
import _ from "lodash";
import useService from "../../hooks/useService";
import service from "../../service";

const getInitTagState = (todo: Todo, tags: Tag[]) =>
  todo.tags
    .map((tags) => ({
      key: tags._id,
      value: tags.name,
      type: OptionsType.DELETEABLE,
    }))
    .concat(
      tags
        .filter((tag) => !todo.tags.map((tag) => tag._id).includes(tag._id))
        .map((tag) => ({
          key: tag._id,
          value: tag.name,
          type: OptionsType.ADDABLE,
        }))
    );

const TodoItem: FunctionComponent<{ todo: Todo; tags: Tag[] }> = ({
  todo,
  tags,
}) => {
  const [selected, setSelected] = useState(false);
  const [editing, setEditing] = useState(false);

  const [todoName, setTodoName] = useState(todo.name);
  const [tagState, setTagState] = useState(getInitTagState(todo, tags));

  const { fetch } = useService((payload) =>
    service.patch(`to-do?id=${todo._id}`, payload)
  );

  const onAddTag = (key: string) => {
    setTagState((tagState) =>
      tagState.map((tag) =>
        tag.key === key ? { ...tag, type: OptionsType.DELETEABLE } : tag
      )
    );
  };

  const onDeleteTag = (key: string) => {
    setTagState((tagState) =>
      tagState.map((tag) =>
        tag.key === key ? { ...tag, type: OptionsType.ADDABLE } : tag
      )
    );
  };

  const submitEdits = () =>
    fetch({
      name: todoName,
      tags: tagState
        .filter((tag) => tag.type === OptionsType.DELETEABLE)
        .map((tag) => tag.key),
    });

  const toggleEdit: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (editing) {
      submitEdits();
    }

    setEditing((editing) => !editing);
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
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        disabled={!editing}
      />

      <SelectDropdown
        placeholder="Show all tags"
        onClick={(e) => e.stopPropagation()}
        onDelete={onDeleteTag}
        onAdd={onAddTag}
        editable={editing}
        options={
          editing
            ? tagState
            : tagState.filter((tag) => tag.type === OptionsType.DELETEABLE)
        }
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
