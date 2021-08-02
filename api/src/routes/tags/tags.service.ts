import createHttpError from 'http-errors';
import TagsModel from 'models/tags.model';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';
import TagsDTO from './dto/tag.dto';

@Service()
class TagService {
  listTags(userId: string, limit: number = 10, page: number = 0) {
    return TagsModel.find({ user: userId }, null, {
      limit,
      skip: limit * page,
      lean: true,
    }).exec();
  }

  async createTag(userId: string, tag: TagsDTO) {
    const id = nanoid();
    const newTag = new TagsModel({ ...tag, _id: id, user: userId });
    await newTag.save();

    return newTag.toObject();
  }

  async deleteTagById(id: string) {
    const tag = await TagsModel.findByIdAndDelete(id, { lean: true }).exec();

    if (!tag) {
      throw new createHttpError.NotFound('Tag ID Not Found');
    }

    return tag;
  }

  async updateTag(id: string, tag: Partial<TagsDTO>) {
    const updatedTag = await TagsModel.findByIdAndUpdate(id, tag, {
      lean: true,
      omitUndefined: true,
      new: true,
    }).exec();

    if (!updatedTag) {
      throw new createHttpError.NotFound('Tag ID Not Found');
    }

    return updatedTag;
  }

  async verifyTags(tagId: string | string[] | undefined) {
    if (!tagId) return true;

    const tags = tagId instanceof String ? [tagId] : tagId;

    for (let i = 0; i < tags.length; i++) {
      const tag = await TagsModel.findById(tags[i]).exec();

      if (!tag) {
        throw new createHttpError.NotFound(`Tag ${tags[i]} not found`);
      }
    }

    return true;
  }
}

export default TagService;
