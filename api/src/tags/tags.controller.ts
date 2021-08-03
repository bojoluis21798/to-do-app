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
import { TagsDTO } from './model/tags.model';
import TagService from './tags.service';

@JsonController('/tags')
@Service()
@UseBefore(ValidJWT)
class TagController {
  constructor(private tagService: TagService) {}

  @Get('/')
  @UseBefore(GetUserFromToken.injectToLocals())
  async fetchTags(@QueryParams() query: PaginationQuery, @Res() res: Response) {
    const tags = await this.tagService.listTags(
      res.locals.user,
      query.limit,
      query.page,
    );

    return {
      message: 'List of tags',
      tags,
    };
  }

  @Post('/')
  @UseBefore(GetUserFromToken.injectToLocals())
  async createTag(@Body() tagDto: TagsDTO, @Res() res: Response) {
    const tag = await this.tagService.createTag(res.locals.user, tagDto);

    return {
      message: 'New Tag Created',
      tag,
    };
  }

  @Delete('/')
  async deleteTag(@QueryParam('id') id: string) {
    const tag = await this.tagService.deleteTagById(id);

    return {
      message: 'Tag Deleted',
      tag,
    };
  }

  @Patch('/')
  async updateTag(
    @QueryParam('id') id: string,
    @Body({ validate: { skipMissingProperties: true } })
    tagDto: Partial<TagsDTO>,
  ) {
    const tag = await this.tagService.updateTag(id, tagDto);

    return {
      message: 'Tag Updated',
      tag,
    };
  }
}

export default TagController;
