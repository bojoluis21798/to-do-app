import { Response } from 'express';
import GetUserFromToken from 'middlewares/getUserFromToken.middleware';
import ValidJWT from 'middlewares/validJWT.middleware';
import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParams,
  Res,
  UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import PaginationQuery from 'types/PaginationQuery';
import TodoDto from './dto/todo.dto';
import TodoService from './to-do.service';

@JsonController('/to-do')
@Service()
@UseBefore(ValidJWT)
class ToDoController {
  constructor(private toDoService: TodoService) {}

  @Get('/')
  @UseBefore(GetUserFromToken.injectToLocals('user'))
  async listTodo(@QueryParams() query: PaginationQuery, @Res() res: Response) {
    const tags = await this.toDoService.listTodo(
      res.locals.user,
      query.limit,
      query.page,
    );

    return { message: 'List of to do', tags };
  }

  @Post('/')
  @UseBefore(GetUserFromToken.injecToBody('user'))
  async createToDo(@Body() todo: TodoDto) {
    const tagId = await this.toDoService.createTodo(todo);

    return {
      message: 'To do created',
      tagId,
    };
  }
}

export default ToDoController;
