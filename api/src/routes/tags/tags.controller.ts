import ValidJWT from 'middlewares/validJWT.middleware';
import {
  Get,
  JsonController,
  QueryParams,
  UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import PaginationQuery from 'types/PaginationQuery';
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

  }
}

export default TagController;
