import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Text, Checkbox, Flex, Grid, Select, Icon } from "@chakra-ui/react";
import React from "react";

const TodoList = () => {
  return (
    <Flex w="100%" flexDirection="column" mb={10} mt={10}>
      <Text mb={5} variant="title" fontSize="2.5rem">
        Today
      </Text>
      <Grid
        bg="white"
        templateColumns="2fr 20fr 2fr 1fr 1fr"
        justifyItems="center"
        alignItems="center"
        gridColumnGap="1rem"
        p={5}
        borderRadius={5}
      >
        <Checkbox></Checkbox>
        <Text justifySelf="start">To do</Text>
        <Select></Select>
        <Icon as={EditIcon} />
        <Icon as={DeleteIcon} />
      </Grid>
    </Flex>
  );
};

export default TodoList;
