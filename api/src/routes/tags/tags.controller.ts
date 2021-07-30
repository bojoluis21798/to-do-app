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
    return this.tagService.listTags(query.limit, query.page);
  }
}

export default TagController;
