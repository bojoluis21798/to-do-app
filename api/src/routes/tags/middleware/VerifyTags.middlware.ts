import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import TagService from '../tags.service';

@Service()
class VerifyTags implements ExpressMiddlewareInterface {
  constructor(private tagsService: TagService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body && 'tags' in req.body) {
      await this.tagsService.verifyTags(req.body.tags);

      next();
    }
  }
}

export default VerifyTags;
