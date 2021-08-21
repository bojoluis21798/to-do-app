import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Button,
  VStack,
  Icon,
  Grid,
  IconButton,
} from "@chakra-ui/react";
import React, { FunctionComponent, MouseEventHandler, useState } from "react";

type SelectDropDownType = {
  options?: { key: string; value: string | number }[];
  onClick?: MouseEventHandler;
  onDelete?: (key: string) => void;
  deletable?: boolean;
  placeholder?: string;
  emptyText?: string;
};

const SelectDropdown: FunctionComponent<SelectDropDownType> = ({
  options,
  onClick,
  onDelete,
  deletable,
  placeholder,
  emptyText,
}) => {
  const [show, setShow] = useState(false);

  const handleButtonClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setShow((show) => !show);

    if (onClick) onClick(e);
  };

  return (
    <Box w="100%" position="relative">
      <Button
        w="100%"
        color="black"
        variant="outline"
        p={1}
        justifyContent={placeholder ? "space-between" : "end"}
        onClick={handleButtonClick}
      >
        <Text fontSize="0.8rem">{placeholder}</Text>
        <Icon as={ChevronDownIcon} />
      </Button>
      {show && (
        <VStack
          boxShadow="dark-lg"
          rounded="md"
          w="100%"
          background="white"
          position="absolute"
        >
          {options && options.length > 0 ? (
            options.map((option) => (
              <Grid
                key={option.key}
                p="3px 2px"
                m="2px 0"
                w="100%"
                templateColumns="2fr 1fr"
                alignItems="center"
                _hover={{
                  color: "white",
                  bg: "blue.300",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {option.value}
                {deletable && (
                  <IconButton
                    aria-label="Close Icon"
                    variant="unstyled"
                    size="sm"
                    onClick={() => onDelete && onDelete(option.key)}
                    icon={<CloseIcon />}
                  />
                )}
              </Grid>
            ))
          ) : (
            <Box p="3px 2px" m="2px 0">
              {emptyText}
            </Box>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default SelectDropdown;
