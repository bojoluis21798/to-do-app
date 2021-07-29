import ValidJWT from 'middlewares/validJWT.middleware';
import { Get, JsonController, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import TagService from './tags.service';

@JsonController('/tags')
@Service()
class TagController {
  constructor(private tagService: TagService) {}

  @Get('/')
  @UseBefore(ValidJWT)
  async fetchTags() {
    return this.tagService.listTags();
  }
}

export default TagController;
