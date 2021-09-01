import { EditIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Grid, Checkbox, IconButton, Input, Box } from "@chakra-ui/react";
import React, { FunctionComponent, MouseEventHandler, useState } from "react";
import SelectDropdown, {
  OptionsType,
  SelectOption,
} from "../../components/SelectDropdown";
import { Todo } from "../../types/Todo";
import _ from "lodash";
import useTodo from "../../hooks/data/useTodo";
import useTags from "../../hooks/data/useTags";
import dayjs from "dayjs";

type TodoItemProps = {
  todo?: Todo;
  newTodo?: boolean;
  onNewTodoSubmit?: () => void;
};

const newTodoFields = {
  _id: "new",
  name: "",
  tags: [],
  completed: false,
  date: dayjs().format(),
};

const TodoItem: FunctionComponent<TodoItemProps> = ({
  todo: initTodo,
  newTodo = false,
  onNewTodoSubmit,
}) => {
  const isNewTodo = !initTodo || newTodo;

  const [newTodoFieldsState, setNewTodoFieldState] =
    useState<Pick<Todo, Exclude<keyof Todo, "user">>>(newTodoFields);

  const todo = !initTodo || newTodo ? newTodoFieldsState : initTodo;

  const {
    addTagtoTodo,
    createTodo,
    deleteTodo,
    deleteTagFromTodo,
    changeTodoName,
    submitEdits,
    setCompletion,
  } = useTodo();

  const { tags } = useTags();

  const [editing, setEditing] = useState(newTodo);

  const onAddTag = (newTag: SelectOption) => {
    const tag = tags.find((tag) => tag._id === newTag.key);

    if (!tag) return;

    if (isNewTodo) {
      setNewTodoFieldState((todo) => ({ ...todo, tags: [...todo.tags, tag] }));
    } else {
      addTagtoTodo(todo._id, tag);
    }
  };

  const onDeleteTag = (tagToDelete: SelectOption) => {
    const tag = tags.find((tag) => tagToDelete.key === tag._id);

    if (!tag) return;

    if (isNewTodo) {
      setNewTodoFieldState((todo) => ({
        ...todo,
        tags: todo.tags.filter((t) => t._id !== tag._id),
      }));
    } else {
      deleteTagFromTodo(todo._id, tag._id);
    }
  };

  const handleTodoNameChange = (name: string) =>
    isNewTodo
      ? setNewTodoFieldState((todo) => ({ ...todo, name }))
      : changeTodoName(todo._id, name);

  const toggleEdit: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (editing) {
      if (!isNewTodo) submitEdits(todo._id);
      else {
        const { _id, ...payload } = todo;
        createTodo(payload);

        if (onNewTodoSubmit) onNewTodoSubmit();
      }
    }

    setEditing((editing) => !editing);
  };

  const handleCompletion = () => {
    if (isNewTodo)
      setNewTodoFieldState((todo) => ({ ...todo, completed: !todo.completed }));
    else setCompletion(todo._id, !todo.completed);
  };

  const handleDeleteTodo: MouseEventHandler = (e) => {
    e.stopPropagation();

    if (isNewTodo) {
      if (onNewTodoSubmit) onNewTodoSubmit();
    } else {
      deleteTodo(todo._id);
    }
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
      onClick={handleCompletion}
    >
      <Checkbox
        variant="readonly"
        isDisabled
        isChecked={todo.completed}
        as="div"
      />

      <Input
        color="black"
        variant={editing ? "flushed" : "unstyled"}
        defaultValue={todo.name}
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
        onClick={handleDeleteTodo}
      />
    </Grid>
  );
};

export default TodoItem;
