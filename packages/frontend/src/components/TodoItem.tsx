// @ts-ignore
import { Todo } from "@ibmi/interfaces";
import { Flex, Box, Button, Checkbox, Text } from "@chakra-ui/core";
import React from "react";
import { FaTimes } from "react-icons/fa";

type Prop = {
  todo: Todo;
  update: any;
  remove: any;
};

function TodoItem({ todo, update, remove }: Prop) {
  return (
    <Flex alignItems="center">
      <Box flexGrow={1}>
        <Checkbox
          onChange={() => update({ ...todo, isComplete: !todo.isComplete })}
          defaultIsChecked={todo.isComplete}
        >
          <Text
            fontSize="xl"
            textDecoration={todo.isComplete ? "line-through" : "none"}
          >
            {todo.title}
          </Text>
          <Text color="#666">{todo.description}</Text>
        </Checkbox>
      </Box>
      <Button
        colorScheme="red"
        variant="ghost"
        borderRadius="50%"
        width="36px"
        height="36px"
        onClick={() => remove(todo)}
      >
        <FaTimes />
      </Button>
    </Flex>
  );
}

export default TodoItem;
