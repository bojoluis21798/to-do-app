import createHttpError from 'http-errors';
import TagsModel from 'models/tags.model';
import TodoModel from 'models/todo.model';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';
import TodoDto from './dto/todo.dto';

@Service()
class TodoService {
  listTodo(userId: string, limit: number = 10, page: number = 0) {
    return TodoModel.find({ user: userId })
      .populate('tags')
      .skip(limit * page)
      .limit(limit)
      .lean()
      .exec();
  }

  async createTodo(userId: string, todo: TodoDto) {
    todo.tags.forEach(async (tag) => {
      const tagExists = await TagsModel.findById(tag).exec();

      if (!tagExists) {
        throw new createHttpError.NotFound(`Tag ${tag} not found`);
      }
    });

    const id = nanoid();
    const newTodo = new TodoModel({ ...todo, _id: id, user: userId });

    await newTodo.save();

    return newTodo.id;
  }
}

export default TodoService;
