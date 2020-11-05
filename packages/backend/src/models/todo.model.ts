import { belongsTo, Entity, model, property } from "@loopback/repository";
import { TodoList, TodoListWithRelations } from "./todo-list.model";

@model({
  name: "TODO",
})
export class Todo extends Entity {
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
    required: true,
    name: "TITLE",
  })
  title: string;

  @property({
    type: "string",
    name: "DESC",
  })
  description?: string;

  @property({
    type: "boolean",
    name: "COMPLETE",
  })
  isComplete?: boolean;

  @belongsTo(
    () => TodoList,
    { keyTo: "id", keyFrom: "todoListId", name: "list" },
    { name: "LISTID" },
  )
  todoListId?: string;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
  todoList?: TodoListWithRelations;
}

export type TodoWithRelations = Todo & TodoRelations;
