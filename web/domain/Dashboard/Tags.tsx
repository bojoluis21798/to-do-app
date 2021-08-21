import { Grid, Flex, Button, Box } from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import { Tag } from "../../types/Tag";

const Tags: FunctionComponent<{ tags: Tag[] }> = ({ tags }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
      <Flex w="100%" overflowX="auto" ml={-3} mr={-3} pb={5}>
        {tags.map((tag: Tag) => (
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
