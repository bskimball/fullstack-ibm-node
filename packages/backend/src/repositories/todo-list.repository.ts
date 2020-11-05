import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from "@loopback/repository";
import { TodoList, TodoListRelations, Todo } from "../models";
import { DockerDb2DataSource } from "../datasources/docker-db2.datasource";
import { inject, Getter } from "@loopback/core";
import { TodoRepository } from "./todo.repository";

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id,
  TodoListRelations
> {
  public readonly todos: HasManyRepositoryFactory<
    Todo,
    typeof TodoList.prototype.id
  >;

  constructor(
    @inject("datasources.docker_db2") dataSource: DockerDb2DataSource,
    @repository.getter("TodoRepository")
    protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(TodoList, dataSource);
    this.todos = this.createHasManyRepositoryFactoryFor(
      "todos",
      todoRepositoryGetter,
    );
    this.registerInclusionResolver("todos", this.todos.inclusionResolver);
  }
  public findByTitle(title: string) {
    return this.findOne({ where: { title } });
  }
}
