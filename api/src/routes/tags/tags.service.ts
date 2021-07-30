import TagsModel from 'models/tags.model';
import { Service } from 'typedi';

@Service()
class TagService {
  listTags(limit: number = 10, page: number = 0) {
    return TagsModel.find({})
      .skip(limit * page)
      .limit(limit)
      .lean()
      .exec();
  }
  }
}

export default TagService;
