import { Response } from 'express';
import ExtractUser from 'middlewares/extractUser.middleware';
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
  @UseBefore(ExtractUser)
  async listTodo(@QueryParams() query: PaginationQuery, @Res() res: Response) {
    const tags = await this.toDoService.listTodo(
      res.locals.user._id,
      query.limit,
      query.page,
    );

    return { message: 'List of tags', tags };
  }

  @Post('/')
  @UseBefore(ExtractUser)
  async createToDo(@Body() todo: TodoDto, @Res() res: Response) {
    const tagId = await this.toDoService.createTodo(res.locals.user._id, todo);

    return {
      message: 'To do created',
      tagId,
    };
  }
}

export default ToDoController;
