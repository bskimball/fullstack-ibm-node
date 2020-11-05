import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
} from "@loopback/repository";
import { User, UserRelations } from "../models";
import { DockerDb2DataSource } from "../datasources";
import { inject, Getter } from "@loopback/core";
import {
  UserCredentials,
  UserCredentialsRepository,
} from "@loopback/authentication-jwt";

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  constructor(
    @inject("datasources.docker_db2") dataSource: DockerDb2DataSource,
    @repository.getter("UserCredentialsRepository")
    protected userCredentialsRepositoryGetter: Getter<
      UserCredentialsRepository
    >,
  ) {
    super(User, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      "userCredentials",
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      "userCredentials",
      this.userCredentials.inclusionResolver,
    );
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (error) {
      if (error.code === "ENTITY_NOT_FOUND") {
        return undefined;
      }
      throw error;
    }
  }
}
