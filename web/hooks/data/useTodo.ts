import { mutate } from "swr";
import todoModel from "../../../api/src/to-do/model/todo.model";
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

  const { fetch: create, isLoading: createLoading } = useService((payload) =>
    service.post(url, payload)
  );

  const { fetch: deleteById, isLoading: deleteLoading } = useService((id) =>
    service.delete(`${url}?id=${id}`)
  );

  const isLoading = [
    fetchLoading,
    deleteLoading,
    editLoading,
    createLoading,
  ].some((loading) => loading);

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

  const setCompletion = async (todoId: string, isComplete: boolean) => {
    await mutate(
      url,
      {
        ...data,
        todos: todos.map((todo) =>
          todo._id === todoId ? { ...todo, completed: isComplete } : todo
        ),
      },
      false
    );

    await edit({
      id: todoId,
      payload: {
        completed: isComplete,
      },
    });

    mutate(url);
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

  const createTodo = async (
    newTodo: Pick<Todo, Exclude<keyof Todo, "user" | "_id">>
  ) => {
    await mutate(
      url,
      { ...data, todos: [...(data?.todos || []), newTodo] },
      false
    );

    await create({ ...newTodo, tags: newTodo.tags.map((tag) => tag._id) });

    revalidate();
  };

  const deleteTodo = async (todoId: string) => {
    await mutate(
      url,
      { ...data, todos: data?.todos.filter((todo) => todo._id !== todoId) },
      false
    );

    await deleteById(todoId);

    revalidate();
  };

  return {
    todos,
    error,
    isLoading,
    addTagtoTodo,
    deleteTagFromTodo,
    changeTodoName,
    setCompletion,
    submitEdits,
    createTodo,
    deleteTodo,
    revalidate,
  };
};

export default useTodo;
