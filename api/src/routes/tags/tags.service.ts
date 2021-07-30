import tagsModel from 'models/tags.model';
import { Service } from 'typedi';

@Service()
class TagService {
  listTags(limit: number = 10, page: number = 0) {
    return tagsModel
      .find()
      .skip(limit * page)
      .limit(limit);
  }
}

export default TagService;
