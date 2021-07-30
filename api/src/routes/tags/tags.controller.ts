import ValidJWT from 'middlewares/validJWT.middleware';
import {
  Body,
  Delete,
  Get,
  JsonController,
  Post,
  QueryParam,
  QueryParams,
  UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import PaginationQuery from 'types/PaginationQuery';
import TagsDTO from './dto/tag.dto';
import TagService from './tags.service';

@JsonController('/tags')
@Service()
class TagController {
  constructor(private tagService: TagService) {}

  @Get('/')
  @UseBefore(ValidJWT)
  async fetchTags(@QueryParams() query: PaginationQuery) {
    const tags = await this.tagService.listTags(query.limit, query.page);

    return {
      message: 'List of tags',
      tags,
    };
  }

  @Post('/')
  @UseBefore(ValidJWT)
  async createTag(@Body() tag: TagsDTO) {
    const newTag = await this.tagService.createTag(tag);

    return {
      message: 'New Tag Created',
      tag: newTag,
    };
  }

  @Delete('/')
  @UseBefore(ValidJWT)
  async deleteTag(@QueryParam('id') id: string) {
    await this.tagService.deleteTagById(id);

    return {
      message: 'Tag Deleted',
      tagId: id,
    };
  }
}

export default TagController;
