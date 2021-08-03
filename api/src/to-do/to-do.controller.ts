import { Response } from 'express';
import GetUserFromToken from 'middlewares/getUserFromToken.middleware';
import ValidJWT from 'middlewares/validJWT.middleware';
import {
  Body,
  Delete,
  Get,
  JsonController,
  Post,
  Patch,
  QueryParam,
  QueryParams,
  Res,
  UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import PaginationQuery from 'types/PaginationQuery';
import { TodoDTO } from './model/todo.model';
import TodoService from './to-do.service';

@JsonController('/to-do')
@Service()
@UseBefore(ValidJWT)
class ToDoController {
  constructor(private toDoService: TodoService) {}

  @Get('/')
  @UseBefore(GetUserFromToken.injectToLocals('user'))
  async listTodo(@QueryParams() query: PaginationQuery, @Res() res: Response) {
    const todos = await this.toDoService.listTodo(
      res.locals.user,
      query.limit,
      query.page,
    );

    return { message: 'List of to do', todos };
  }

  @Post('/')
  @UseBefore(GetUserFromToken.injectToLocals('user'))
  async createToDo(@Body() todo: TodoDTO, @Res() res: Response) {
    const todoId = await this.toDoService.createTodo(res.locals.user, todo);

    return {
      message: 'To do created',
      todo: todoId,
    };
  }

  @Delete('/')
  async deleteTodo(@QueryParam('id') id: string) {
    const todoId = await this.toDoService.deleteTodo(id);

    return {
      message: 'To do deleted',
      todo: todoId,
    };
  }

  @Patch('/')
  async updateTodo(
    @QueryParam('id') id: string,
    @Body({ validate: { skipMissingProperties: true } }) todo: Partial<TodoDTO>,
  ) {
    const todoId = await this.toDoService.updateTodo(id, todo);

    return {
      message: 'To do updated',
      todo: todoId,
    };
  }
}

export default ToDoController;
