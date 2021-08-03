import createHttpError from 'http-errors';
import TodoModel, { TodoDTO } from 'to-do/model/todo.model';
import { nanoid } from 'nanoid';
import TagService from 'tags/tags.service';
import { Service } from 'typedi';

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

  async createTodo(userId: string, todo: TodoDTO) {
    if (await this.tagsService.verifyTags(todo.tags)) {
      const id = nanoid();
      const newTodo = new TodoModel({ ...todo, _id: id, user: userId });

      await newTodo.save();

      return newTodo.toObject();
    }
  }

  async findTodoById(userId: string, id: string) {
    const toDo = await TodoModel.findById(id).exec();

    if (!toDo) {
      throw new createHttpError.NotFound('Todo not found');
    } else if (toDo.user !== userId) {
      throw new createHttpError.Forbidden('User does not own this tag');
    }

    return toDo;
  }

  async deleteTodo(userId: string, id: string) {
    const todo = await this.findTodoById(userId, id);

    const removedTodo = await todo.remove();
    return removedTodo.toObject();
  }

  async updateTodo(userId: string, todoId: string, todoDto: Partial<TodoDTO>) {
    if (await this.tagsService.verifyTags(todoDto.tags)) {
      const todo = await this.findTodoById(userId, todoId);

      const update = todo.update(todoDto, {
        omitUndefined: true,
      });

      await update.exec();

      return update.getUpdate();
    }
  }
}

export default TodoService;
