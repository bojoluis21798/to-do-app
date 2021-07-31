import TodoModel from 'models/todo.model';
import { Service } from 'typedi';

@Service()
class TodoService {
  listTodo(created_by: string, limit: number = 10, page: number = 0) {
    return TodoModel.find({ created_by })
      .skip(limit * page)
      .limit(limit)
      .lean()
      .exec();
  }
}

export default TodoService;
