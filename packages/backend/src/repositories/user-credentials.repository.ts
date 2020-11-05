import { DefaultCrudRepository } from "@loopback/repository";
import { UserCredential, UserCredentialsRelations } from "../models";
import { DockerDb2DataSource } from "../datasources";
import { inject } from "@loopback/core";

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredential,
  typeof UserCredential.prototype.id,
  UserCredentialsRelations
> {
  constructor(
    @inject("datasources.docker_db2") dataSource: DockerDb2DataSource,
  ) {
    super(UserCredential, dataSource);
  }
}
