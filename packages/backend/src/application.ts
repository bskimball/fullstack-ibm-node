import { BootMixin } from "@loopback/boot";
import { ApplicationConfig } from "@loopback/core";
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from "@loopback/rest-explorer";
import { RepositoryMixin } from "@loopback/repository";
import { RestApplication } from "@loopback/rest";
import { ServiceMixin } from "@loopback/service-proxy";
import path from "path";
import { MySequence } from "./sequence";
import { AuthenticationComponent } from "@loopback/authentication";
import {
  JWTAuthenticationComponent,
  UserServiceBindings,
  RefreshTokenServiceBindings,
} from "@loopback/authentication-jwt";
import { DockerDb2DataSource } from "./datasources";
// import { UserService } from "./services";
import { RefreshTokenRepository, UserRepository } from "./repositories";

export { ApplicationConfig };

export class BackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static("/", path.join(__dirname, "../public"));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: "/explorer",
    });

    // Mount Authentication System
    this.component(AuthenticationComponent);
    // Mount JWT Component
    this.component(JWTAuthenticationComponent);

    // Bind user service
    this.dataSource(DockerDb2DataSource, UserServiceBindings.DATASOURCE_NAME);
    // this.bind(UserServiceBindings.USER_SERVICE).toClass(UserService);
    this.bind(UserServiceBindings.USER_REPOSITORY).toClass(UserRepository);

    // Bind refresh token service datasource
    this.dataSource(
      DockerDb2DataSource,
      RefreshTokenServiceBindings.DATASOURCE_NAME,
    );
    this.bind(RefreshTokenServiceBindings.REFRESH_REPOSITORY).toClass(
      RefreshTokenRepository,
    );

    // Rest Explorer
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ["controllers"],
        extensions: [".controller.js"],
        nested: true,
      },
    };
  }
}
