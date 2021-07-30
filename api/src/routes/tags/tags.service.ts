import TagsModel from 'models/tags.model';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';
import TagsDTO from './dto/tag.dto';

@Service()
class TagService {
  listTags(limit: number = 10, page: number = 0) {
    return TagsModel.find({})
      .skip(limit * page)
      .limit(limit)
      .lean()
      .exec();
  }

  async createTag(tag: TagsDTO) {
    const id = nanoid();
    const newTag = new TagsModel({ ...tag, _id: id });
    await newTag.save();

    return newTag.id;
  }
}

export default TagService;
