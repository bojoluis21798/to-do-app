import { TodoModelSchema } from "../../api/src/to-do/model/todo.model";
import { Tag } from "./Tag";

export type Todo = Pick<
  TodoModelSchema,
  Exclude<keyof TodoModelSchema, "tags">
> & {
  tags: Tag[];
};
