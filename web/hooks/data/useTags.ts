import { mutate } from "swr";
import service from "../../service";
import endpointUrls from "../../service/endpointUrls";
import { Tag } from "../../types/Tag";
import useFetcher from "../useFetcher";
import useService from "../useService";
import useTodo from "./useTodo";

const url = endpointUrls.tags;

type TagResponse =
  | {
      message: string;
      tags: Tag[];
    }
  | undefined;

const useTags = () => {
  const { data, error, isLoading: fetchLoading } = useFetcher<TagResponse>(url);
  const tags = data?.tags || [];

  const { revalidate: revalidateTodo } = useTodo();

  const { fetch: create, isLoading: createLoading } = useService((payload) =>
    service.post(url, payload)
  );

  const { fetch: deleteById, isLoading: deleteLoading } = useService((id) =>
    service.delete(`${url}?id=${id}`)
  );

  const isLoading = [fetchLoading, createLoading, deleteLoading].some(
    (loading) => loading
  );

  const revalidate = () => mutate(url);

  const createTag = async (newTag: { name: string }) => {
    await mutate(url, { ...data, tags: [...tags, newTag] }, false);

    await create(newTag);

    revalidate();
  };

  const deleteTag = async (tagId: string) => {
    await mutate(
      url,
      { ...data, tags: tags.filter((tag) => tag._id !== tagId) },
      false
    );

    await deleteById(tagId);

    revalidate();
    revalidateTodo();
  };

  return {
    error,
    isLoading,
    tags,
    createTag,
    deleteTag,
    revalidate,
  };
};

export default useTags;
