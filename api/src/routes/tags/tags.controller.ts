import ValidJWT from 'middlewares/validJWT.middleware';
import {
  Body,
  Get,
  JsonController,
  Post,
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
}

export default TagController;
