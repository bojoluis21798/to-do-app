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
import TagsDTO from './dto/tag.dto';
import TagService from './tags.service';

@JsonController('/tags')
@Service()
@UseBefore(ValidJWT)
class TagController {
  constructor(private tagService: TagService) {}

  @Get('/')
  @UseBefore(GetUserFromToken.injectToLocals('user'))
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
  @UseBefore(GetUserFromToken.injectToLocals('user'))
  async createTag(@Body() tag: TagsDTO, @Res() res: Response) {
    const newTag = await this.tagService.createTag(res.locals.user, tag);

    return {
      message: 'New Tag Created',
      tag: newTag,
    };
  }

  @Delete('/')
  async deleteTag(@QueryParam('id') id: string) {
    const tagId = await this.tagService.deleteTagById(id);

    return {
      message: 'Tag Deleted',
      tagId: tagId,
    };
  }

  @Patch('/')
  async updateTag(
    @QueryParam('id') id: string,
    @Body({ validate: { skipMissingProperties: true } }) tag: Partial<TagsDTO>,
  ) {
    const updatedTag = await this.tagService.updateTag(id, tag);

    return {
      message: 'Tag Updated',
      tagId: updatedTag,
    };
  }
}

export default TagController;
