import React from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/core";
import useSWR from "swr";
import { TodoList } from "../interfaces";
import Layout from "../components/AppLayout";
import TodoGroup from "../components/TodoGroup";
import { v4 as uuid } from "uuid";
import TodoListForm from "../components/TodoListForm";
import http from "../utils/http";
import withGuard from "../components/withGuard";
import { FaTimes } from "react-icons/fa";

function TodoPage() {
  const { data: todoLists, mutate } = useSWR<TodoList[]>(
    "todo-lists?filter[order]=lastModified%20ASC",
    async (url) => await http.get(url).json()
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout title="Todo | Next.js + TypeScript Example">
      <Box mb={5}>
        <Button onClick={onOpen} colorScheme="blue">
          Create List
        </Button>
      </Box>
      <SimpleGrid columns={{ sm: 2, md: 3 }} spacing="30px">
        {todoLists?.map((list: TodoList) => (
          <Box key={uuid()}>
            <Flex>
              <Button
                colorScheme="red"
                variant="ghost"
                ml="auto"
                rightIcon={<FaTimes />}
                onClick={() => removeTodoList(list)}
              >
                Remove List
              </Button>
            </Flex>
            <TodoGroup todoList={list} />
          </Box>
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="md">
          <ModalHeader>Create List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TodoListForm create={createTodoList} />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );

  async function createTodoList(list: TodoList) {
    await http.post("todo-lists", { json: { ...list } });
    // @ts-ignore
    mutate([...todoLists, list]);
    onClose();
  }

  async function removeTodoList(list: TodoList) {
    await http.delete(`todo-lists/${list.id}`);
    mutate(todoLists?.filter((l: TodoList) => l.id !== list.id));
  }
}

export default withGuard(TodoPage);
