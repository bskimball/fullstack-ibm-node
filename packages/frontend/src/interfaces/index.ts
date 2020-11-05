// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  todoListId: number;
};

export type TodoList = {
  id: number;
  color: string;
  title: string;
  lastModified: string;
  todos: Todo[];
};

export type Credentials = {
  email: string;
  password: string;
  remember: boolean;
};
