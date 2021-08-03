import createHttpError from 'http-errors';
import TagsModel, { TagsDTO } from 'tags/model/tags.model';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';

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

  async findTagById(userId: string, tagId: string) {
    const tag = await TagsModel.findById(tagId).exec();

    if (!tag) {
      throw new createHttpError.NotFound('Tag ID Not Found');
    } else if (tag.user !== userId) {
      throw new createHttpError.Forbidden('User does not own this tag');
    }

    return tag;
  }

  async deleteTagById(userId: string, tagId: string) {
    const tag = await this.findTagById(userId, tagId);

    const deletedTag = await tag.remove();
    return deletedTag.toObject();
  }

  async updateTag(userId: string, tagId: string, tagDto: Partial<TagsDTO>) {
    const tag = await this.findTagById(userId, tagId);

    const update = tag.update(tagDto, {
      omitUndefined: true,
    });

    await update.exec();

    return update.getUpdate();
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
