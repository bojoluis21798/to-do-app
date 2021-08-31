import { mutate } from "swr";
import service from "../../service";
import endpointUrls from "../../service/endpointUrls";
import { Tag } from "../../types/Tag";
import { Todo } from "../../types/Todo";
import useFetcher from "../useFetcher";
import useService from "../useService";

const url = endpointUrls.todos;

type TodoResponse =
  | {
      message: string;
      todos: Todo[];
    }
  | undefined;

const useTodo = () => {
  const {
    data,
    error,
    isLoading: fetchLoading,
  } = useFetcher<TodoResponse>(url);

  const todos = data?.todos || [];

  const { fetch: edit, isLoading: editLoading } = useService(
    ({ id, payload }) => service.patch(`${url}?id=${id}`, payload)
  );

  const isLoading = [fetchLoading, editLoading].some((loading) => loading);

  const revalidate = () => mutate(url);

  const addTagtoTodo = (todoId: string, newTag: Tag) => {
    mutate(
      url,
      {
        ...data,
        todos: todos.map((todo) =>
          todo._id === todoId ? { ...todo, tags: [...todo.tags, newTag] } : todo
        ),
      },
      false
    );
  };

  const deleteTagFromTodo = (todoId: string, tagToDeleteId: string) => {
    mutate(
      url,
      {
        ...data,
        todos: todos.map((todo) =>
          todo._id === todoId
            ? {
                ...todo,
                tags: todo.tags.filter((tag) => tag._id !== tagToDeleteId),
              }
            : todo
        ),
      },
      false
    );
  };

  const changeTodoName = (todoId: string, name: string) => {
    mutate(
      url,
      {
        ...data,
        todos: todos.map((todo) =>
          todo._id === todoId ? { ...todo, name } : todo
        ),
      },
      false
    );
  };

  const submitEdits = async (todoId: string) => {
    const todo = todos.find((todo) => todo._id === todoId);

    if (todo) {
      await edit({
        id: todoId,
        payload: {
          name: todo.name,
          tags: todo.tags,
        },
      });

      revalidate();
    }
  };

  return {
    todos,
    error,
    isLoading,
    addTagtoTodo,
    deleteTagFromTodo,
    changeTodoName,
    submitEdits,
    revalidate,
  };
};

export default useTodo;
