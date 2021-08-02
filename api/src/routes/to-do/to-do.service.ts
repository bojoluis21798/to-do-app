import createHttpError from 'http-errors';
import TodoModel from 'models/todo.model';
import { nanoid } from 'nanoid';
import TagService from 'routes/tags/tags.service';
import { Service } from 'typedi';
import TodoDto from './dto/todo.dto';

@Service()
class TodoService {
  constructor(private tagsService: TagService) {}

  listTodo(userId: string, limit: number = 10, page: number = 0) {
    return TodoModel.find({ user: userId }, null, {
      populate: 'tags',
      skip: limit * page,
      limit: limit,
      lean: true,
    }).exec();
  }

  async createTodo(userId: string, todo: TodoDto) {
    if (await this.tagsService.verifyTags(todo.tags)) {
      const id = nanoid();
      const newTodo = new TodoModel({ ...todo, _id: id, user: userId });

      await newTodo.save();

      return newTodo.id;
    }
  }

  async deleteTodo(id: string) {
    const toDo = await TodoModel.findByIdAndDelete(id, { lean: true }).exec();

    if (!toDo) {
      throw new createHttpError.NotFound('Todo not found');
    }

    return toDo._id;
  }

  async updateTodo(id: string, todo: Partial<TodoDto>) {
    if (await this.tagsService.verifyTags(todo.tags)) {
      const todoDoc = await TodoModel.findByIdAndUpdate(id, todo, {
        lean: true,
        omitUndefined: true,
      }).exec();

      if (!todoDoc) {
        throw new createHttpError.NotFound('To do not found');
      }

      return todoDoc._id;
    }
  }
}

export default TodoService;
