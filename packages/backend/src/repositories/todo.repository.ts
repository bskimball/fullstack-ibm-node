import { DefaultCrudRepository } from "@loopback/repository";
import { Todo, TodoRelations } from "../models";
import { DockerDb2DataSource } from "../datasources/docker-db2.datasource";
import { inject } from "@loopback/core";

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {
  constructor(
    @inject("datasources.docker_db2") dataSource: DockerDb2DataSource,
  ) {
    super(Todo, dataSource);
  }
}
