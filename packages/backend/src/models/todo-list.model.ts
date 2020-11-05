import { Entity, model, property, hasMany } from "@loopback/repository";
import { Todo, TodoWithRelations } from "./todo.model";

@model({
  name: "TODOLIST",
})
export class TodoList extends Entity {
  @property({
    type: "string",
    required: true,
    name: "TITLE",
  })
  title: string;

  @property({
    type: "string",
    id: true,
    generated: false,
    name: "ID",
    defaultFn: "uuidv4",
  })
  id?: string;

  @property({
    type: "string",
    name: "COLOR",
  })
  color?: string;

  @property({
    type: "date",
    name: "UPDATED",
    default: () => new Date(),
  })
  lastModified?: string;

  @hasMany(() => Todo, { keyTo: "todoListId" })
  todos: Todo[];

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  todos?: TodoWithRelations[];
}

export type TodoListWithRelations = TodoList & TodoListRelations;
