import { Grid, Flex, Button, Box } from "@chakra-ui/react";
import React from "react";

const tagData = [
  "Personal",
  "Home",
  "School",
  "Personal",
  "Home",
  "School",
  "Personal",
  "Home",
  "School",
  "Personal",
  "Home",
  "School",
  "Personal",
  "Home",
  "School",
];

const Tags = () => {
  return (
    <Grid w="100%" templateColumns="20fr 2fr">
      <Flex w="100%" overflowX="auto" ml={-5} mr={-5} pb={5}>
        {tagData.map((tag) => (
          <Box>
            <Button ml={3} mr={3}>
              {tag}
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
