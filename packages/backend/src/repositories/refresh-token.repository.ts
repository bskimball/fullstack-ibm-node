import { DefaultCrudRepository } from "@loopback/repository";
import { RefreshToken, RefreshTokenRelations } from "../models";
import { DockerDb2DataSource } from "../datasources/docker-db2.datasource";
import { inject } from "@loopback/core";

export class RefreshTokenRepository extends DefaultCrudRepository<
  RefreshToken,
  typeof RefreshToken.prototype.id,
  RefreshTokenRelations
> {
  constructor(
    @inject("datasources.docker_db2") dataSource: DockerDb2DataSource,
  ) {
    super(RefreshToken, dataSource);
  }
}
