import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";

const config = {
  name: "docker_db2",
  connector: "db2",
  host: "127.0.0.1",
  port: 50000,
  user: "db2inst1",
  password: "db2inst1",
  database: "stack",
  schema: "fullstack",
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver("datasource")
export class DockerDb2DataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = "docker_db2";
  static readonly defaultConfig = config;

  constructor(
    @inject("datasources.config.docker_db2", { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
