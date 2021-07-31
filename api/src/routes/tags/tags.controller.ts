import { Response } from 'express';
import ExtractUser from 'middlewares/extractUser.middleware';
import ValidJWT from 'middlewares/validJWT.middleware';
import {
  Body,
  Delete,
  Get,
  JsonController,
  Post,
  Put,
  QueryParam,
  QueryParams,
  Res,
  UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import PaginationQuery from 'types/PaginationQuery';
import TagsDTO from './dto/tag.dto';
import UpdateTagDTO from './dto/update-tag.dto';
import TagService from './tags.service';

@JsonController('/tags')
@Service()
@UseBefore(ValidJWT)
class TagController {
  constructor(private tagService: TagService) {}

  @Get('/')
  @UseBefore(ExtractUser)
  async fetchTags(@QueryParams() query: PaginationQuery, @Res() res: Response) {
    const tags = await this.tagService.listTags(
      res.locals.user._id,
      query.limit,
      query.page,
    );

    return {
      message: 'List of tags',
      tags,
    };
  }

  @Post('/')
  @UseBefore(ExtractUser)
  async createTag(@Body() tag: TagsDTO, @Res() res: Response) {
    const newTag = await this.tagService.createTag(res.locals.user._id, tag);

    return {
      message: 'New Tag Created',
      tag: newTag,
    };
  }

  @Delete('/')
  async deleteTag(@QueryParam('id') id: string) {
    await this.tagService.deleteTagById(id);

    return {
      message: 'Tag Deleted',
      tagId: id,
    };
  }

  @Put('/')
  async updateTag(@QueryParam('id') id: string, @Body() tag: UpdateTagDTO) {
    const updatedTag = await this.tagService.updateTag(id, tag);

    return {
      message: 'Tag Updated',
      tagId: updatedTag,
    };
  }
}

export default TagController;
