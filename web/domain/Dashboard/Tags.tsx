import { AddIcon } from "@chakra-ui/icons";
import { Text, Grid, Flex, Button, Box, Icon } from "@chakra-ui/react";
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
    <Grid w="100%" templateColumns="20fr 2fr 2fr" columnGap={2}>
      <Flex w="100%" overflowX="auto" ml={-3} mr={-3} pb={5}>
        {tags.map((tag: Tag) => (
          <Box key={tag._id}>
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
