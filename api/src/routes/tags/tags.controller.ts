import validJWT from 'middlewares/validJWT.middleware';
import { Get, JsonController, UseBefore } from 'routing-controllers';

@JsonController('/tags')
class TagController {
  @Get('/')
  @UseBefore(validJWT)
  async fetchTags() {
    return `Fetch Tags: Not implemented`;
  }
}

export default TagController;
