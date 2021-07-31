import createHttpError from 'http-errors';
import TagsModel from 'models/tags.model';
import TodoModel from 'models/todo.model';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';
import TodoDto from './dto/todo.dto';

@Service()
class TodoService {
  listTodo(created_by: string, limit: number = 10, page: number = 0) {
    return TodoModel.find({ created_by })
      .populate('tags')
      .skip(limit * page)
      .limit(limit)
      .lean()
      .exec();
  }

  async createTodo(created_by: string, todo: TodoDto) {
    const tagExists = await TagsModel.findById(todo.tags).exec();

    if (!tagExists) {
      throw new createHttpError.NotFound('Tag not found');
    }

    const id = nanoid();
    const newTodo = new TodoModel({ ...todo, _id: id, created_by });

    await newTodo.save();

    return newTodo.id;
  }
}

export default TodoService;
