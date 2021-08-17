import { Grid, Flex, Button, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import useFetcher from "../../hooks/useFetcher";

export type TagResponse = {
  _id: string;
  name: string;
  user: string;
  __v: number;
};

const Tags = () => {
  const { data } = useFetcher("/tags");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags: TagResponse[] = data.tags;

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

  return (
    <Grid w="100%" templateColumns="20fr 2fr">
      <Flex w="100%" overflowX="auto" ml={-5} mr={-5} pb={5}>
        {tags.map((tag: TagResponse) => (
          <Box>
            <Button
              ml={3}
              mr={3}
              variant={selectedTags.includes(tag._id) ? "" : "outline-blue"}
              onClick={() => toggleSelectedTag(tag._id)}
            >
              {tag.name}
            </Button>
          </Box>
        ))}
      </Flex>
      <Box>
        <Button variant="outline">New Tag</Button>
      </Box>
    </Grid>
  );
};

export default Tags;
