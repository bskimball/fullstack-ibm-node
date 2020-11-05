import React from "react";
import useSWR, { mutate } from "swr";
// @ts-ignore
import { Todo } from "@ibmi/interfaces";
import { Heading, Stack, Box } from "@chakra-ui/core";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
// @ts-ignore
import { v4 as uuid } from "uuid";
import http from "../utils/http";

function TodoList() {
  const { data: todos } = useSWR<Todo[Todo]>(
    "todos",
    async (url) => await http.get(url).json()
  );

  return (
    <>
      <Box mb={4}>
        <Heading as="h1" fontSize="2xl">
          Todos
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
    await http.put(`/api/todos/${todo.id}`, {
      json: { ...todo },
    });
    mutate(
      `/api/todos`,
      todos?.map((t: Todo) => (t.id === todo.id ? todo : t)),
      false
    );
  }

  async function addTodo(todo: Todo) {
    await http.post("/api/todos", { json: { ...todo } });
    mutate("/api/todos", [...todos, todo]);
  }

  async function removeTodo(todo: Todo) {
    await http.delete(`/api/todos/${todo.id}`);
    mutate(
      "/api/todos",
      todos.filter((t: Todo) => t.id !== todo.id)
    );
  }
}

export default TodoList;
