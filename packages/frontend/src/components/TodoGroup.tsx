import React from "react";
import useSWR, { mutate } from "swr";
// @ts-ignore
import { Todo, TodoList } from "../interfaces";
import { Heading, Stack, Box } from "@chakra-ui/core";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
// @ts-ignore
import { v4 as uuid } from "uuid";
import http from "../utils/http";

type Props = {
  todoList: TodoList;
};

function TodoGroup({ todoList }: Props) {
  const { data: todos } = useSWR<Todo[]>(
    `todo-lists/${todoList.id}/todos`,
    async (url) => await http.get(url).json()
  );

  return (
    <>
      <Box
        pb={4}
        mb={4}
        borderBottom="2px"
        borderColor={`${todoList.color}.600`}
      >
        <Heading as="h3" fontSize="xl">
          {todoList.title}
        </Heading>
      </Box>
      <Box mb={4}>
        <TodoForm add={addTodo} />
      </Box>
      <Box mb={4}>
        <Stack spacing={12}>
          {todos?.map((todo: Todo) => (
            <TodoItem
              key={uuid()}
              todo={todo}
              update={updateTodo}
              remove={removeTodo}
            />
          ))}
        </Stack>
      </Box>
    </>
  );

  async function updateTodo(todo: Todo) {
    const { id, ...rest } = todo;
    await http.put(`todos/${id}`, {
      json: { ...rest },
    });
    mutate(
      `todo-lists/${todoList.id}/todos`,
      todos?.map((t: Todo) => (t.id === id ? todo : t)),
      false
    );
  }

  async function addTodo(todo: Todo) {
    todo = { ...todo, todoListId: todoList.id };
    await http.post("todos", { json: { ...todo } });
    // @ts-ignore
    mutate(`todo-lists/${todoList.id}/todos`, [...todos, todo]);
  }

  async function removeTodo(todo: Todo) {
    await http.delete(`todos/${todo.id}`);
    mutate(
      `todo-lists/${todoList.id}/todos`,
      todos?.filter((t: Todo) => t.id !== todo.id)
    );
  }
}

export default TodoGroup;
