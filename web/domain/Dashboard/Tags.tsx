import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Text,
  Grid,
  Flex,
  Button,
  Box,
  Icon,
  Input,
  IconButton,
} from "@chakra-ui/react";
import React, {
  FunctionComponent,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";
import useService from "../../hooks/useService";
import service from "../../service";
import { Tag } from "../../types/Tag";

const Tags: FunctionComponent<{ tags: Tag[] }> = ({ tags }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState(false);

  const [error, setError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { fetch: postTag } = useService(
    (payload) => service.post("/tags", payload),
    "/tags"
  );

  const { fetch: deleteTag } = useService(
    (id) => service.delete(`/tags?id=${id}`),
    "/tags"
  );

  const toggleSelectedTag = (tagId: string) => {
    const tagIndex = selectedTags.findIndex(
      (selectedTag) => selectedTag === tagId
    );

    const newSelectedTags = selectedTags.slice();

    if (tagIndex !== -1) {
      newSelectedTags.splice(tagIndex, 1);
    } else {
      newSelectedTags.push(tagId);
    }

    setSelectedTags(newSelectedTags);
  };

  const submitNewTag: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      setNewTag(false);

      const inputVal = inputRef?.current?.value;

      if (!inputVal) return;

      if (tags.map((tag) => tag.name).includes(inputVal)) {
        setError(true);
      } else {
        postTag({ name: inputVal });
      }
    }
  };

  const handleDeleteTag = (e: React.MouseEvent, tagId: string) => {
    e.stopPropagation();

    deleteTag(tagId);
  };

  console.log(tags);

  return (
    <Grid w="100%" templateColumns="20fr 2fr" columnGap={2}>
      <Flex w="100%" overflowX="auto" ml={-3} mr={-3} pb={5}>
        {tags.map((tag: Tag) => (
          <Box key={tag._id}>
            <Button
              ml={3}
              mr={3}
              variant={selectedTags.includes(tag._id) ? "" : "outline-blue"}
              onClick={() => toggleSelectedTag(tag._id)}
            >
              <Text>{tag.name}</Text>
              <IconButton
                aria-label="Close Icon"
                variant="unstyled"
                icon={<CloseIcon />}
                size="xs"
                pr={0}
                onClick={(e) => handleDeleteTag(e, tag._id)}
              />
            </Button>
          </Box>
        ))}
        {newTag ? (
          <Box w="15rem" mr={3}>
            <Input
              ref={inputRef}
              variant="outline"
              placeholder="Enter new tag name"
              onBlur={() => setNewTag(false)}
              onKeyDown={submitNewTag}
            />
            {error && <Text variant="error">Tag name already exists</Text>}
          </Box>
        ) : (
          <Box>
            <Button variant="outline" onClick={() => setNewTag(true)}>
              Add Tag
            </Button>
          </Box>
        )}
      </Flex>
      <Box>
        <Button aria-label="Add Icon">
          <Icon mr={2} as={AddIcon} />
          <Text>Add Todo</Text>
        </Button>
      </Box>
    </Grid>
  );
};

export default Tags;
