import { Response } from 'express';
import ExtractUser from 'middlewares/extractUser.middleware';
import ValidJWT from 'middlewares/validJWT.middleware';
import {
  Get,
  JsonController,
  QueryParams,
  Res,
  UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import PaginationQuery from 'types/PaginationQuery';
import TodoService from './to-do.service';

@JsonController('/to-do')
@Service()
@UseBefore(ValidJWT)
class ToDoController {
  constructor(private toDoService: TodoService) {}

  @Get('/')
  @UseBefore(ExtractUser)
  async listTodo(@QueryParams() query: PaginationQuery, @Res() res: Response) {
    const tags = await this.toDoService.listTodo(
      res.locals.user._id,
      query.limit,
      query.page,
    );

    return tags;
  }
}

export default ToDoController;
