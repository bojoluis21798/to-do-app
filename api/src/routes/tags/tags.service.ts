import createHttpError from 'http-errors';
import TagsModel from 'models/tags.model';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';
import TagsDTO from './dto/tag.dto';
import UpdateTagDTO from './dto/update-tag.dto';

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

  async deleteTagById(id: string) {
    if (!(await TagsModel.findByIdAndDelete(id).exec())) {
      throw new createHttpError.NotFound('Tag ID Not Found');
    }
  }

  async updateTag(id: string, tag: UpdateTagDTO) {
    const updatedTag = await TagsModel.findByIdAndUpdate(id, tag).exec();

    if (!updatedTag) {
      throw new createHttpError.NotFound('Tag ID Not Found');
    } else {
      return updatedTag.toObject()._id;
    }
  }
}

export default TagService;
