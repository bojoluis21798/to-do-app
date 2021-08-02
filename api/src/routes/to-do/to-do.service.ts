import createHttpError from 'http-errors';
import TagsModel from 'models/tags.model';
import TodoModel from 'models/todo.model';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';
import TodoDto from './dto/todo.dto';

@Service()
class TodoService {
  listTodo(userId: string, limit: number = 10, page: number = 0) {
    return TodoModel.find({ user: userId }, null, {
      populate: 'tags',
      skip: limit * page,
      limit: limit,
      lean: true,
    }).exec();
  }

  async createTodo(userId: string, todo: TodoDto) {
    for (let i = 0; i < todo.tags.length; i++) {
      const tag = await TagsModel.findById(todo.tags[i]).exec();

      if (!tag) {
        throw new createHttpError.NotFound(`Tag ${todo.tags[i]} not found`);
      }
    }

    const id = nanoid();
    const newTodo = new TodoModel({ ...todo, _id: id, user: userId });

    await newTodo.save();

    return newTodo.id;
  }

  async deleteTodo(id: string) {
    const toDo = await TodoModel.findByIdAndDelete(id).exec();

    if (!toDo) {
      throw new createHttpError.NotFound('Todo not found');
    }

    return toDo.toObject()._id;
  }
  }
}

export default TodoService;
