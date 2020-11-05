import { inject } from "@loopback/core";
import { model, property } from "@loopback/repository";
import {
  TokenServiceBindings,
  UserServiceBindings,
  RefreshTokenService,
  RefreshTokenServiceBindings,
  TokenObject,
} from "@loopback/authentication-jwt";
import {
  get,
  post,
  requestBody,
  RestBindings,
  SchemaObject,
  Request,
  Response,
} from "@loopback/rest";
import { authenticate, TokenService } from "@loopback/authentication";
import { SecurityBindings, UserProfile, securityId } from "@loopback/security";
import { genSalt, hash } from "bcryptjs";
import { UserRepository } from "../repositories";
import { User } from "../models";
import { UserService, Credentials } from "../services";

// Describe the schema of user credentials
const CredentialsSchema: SchemaObject = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
    },
    remember: {
      type: "boolean",
    },
  },
};

@model()
export class NewUserRequest extends User {
  @property({
    type: "string",
    required: true,
  })
  password: string;
}

export const CredentialsRequestBody = {
  description: "The input of login function",
  required: true,
  content: {
    "application/json": { schema: CredentialsSchema },
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService,
    @inject(SecurityBindings.USER, { optional: true })
    private user: UserProfile,
    @inject(UserServiceBindings.USER_REPOSITORY)
    public userRepository: UserRepository,
    @inject(RefreshTokenServiceBindings.REFRESH_TOKEN_SERVICE)
    public refreshService: RefreshTokenService,
    @inject(RestBindings.Http.REQUEST)
    private request: Request,
    @inject(RestBindings.Http.RESPONSE)
    private response: Response,
  ) {}

  @post("/users/signup", {
    responses: {
      "200": {
        description: "User model instance",
        content: {
          "application/json": {
            schema: {
              "x-ts-type": User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        "application/json": {
          schema: CredentialsSchema,
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    const password = await hash(newUserRequest.password, await genSalt());
    delete (newUserRequest as Partial<NewUserRequest>).password;
    const savedUser = await this.userRepository.create(newUserRequest);

    await this.userRepository
      .userCredentials(savedUser.id)
      .create({ password });

    return savedUser;
  }

  /**
   * A login function that returns an access token. After login, include the token
   * in the next requests to verify your identity.
   * @param credentials User email and password
   */
  @post("/users/login", {
    responses: {
      "200": {
        description: "Token",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{ user: object }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const accessToken = await this.jwtService.generateToken(userProfile);

    const { refreshToken } = await this.refreshService.generateToken(
      userProfile,
      accessToken,
    );

    const expiration = credentials.remember
      ? { maxAge: 30 * 24 * 3600000 }
      : { expires: undefined };

    this.response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      ...expiration,
    });
    this.response.cookie("access_token", accessToken);

    return {
      user: userProfile,
    };
  }

  @authenticate("jwt")
  @get("/who-am-i", {
    responses: {
      "200": {
        description: "",
        schema: {
          type: "string",
        },
      },
    },
  })
  async whoAmI(): Promise<object> {
    const user = await this.userRepository.findById(this.user[securityId]);
    return this.userService.convertToUserProfile(user);
  }
  /**
   * A login function that returns refresh token and access token.
   * @param credentials User email and password
   */
  @post("/users/refresh-login", {
    responses: {
      "200": {
        description: "Token",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                },
                refreshToken: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  })
  async refreshLogin(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<TokenObject> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile: UserProfile = this.userService.convertToUserProfile(
      user,
    );

    const accessToken = await this.jwtService.generateToken(userProfile);

    const tokens = await this.refreshService.generateToken(
      userProfile,
      accessToken,
    );

    return tokens;
  }

  @post("/refresh", {
    responses: {
      "200": {
        description: "Token",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "object",
                },
              },
            },
          },
        },
      },
    },
  })
  async refresh(): Promise<object> {
    const { accessToken } = await this.refreshService.refreshToken(
      this.request.cookies.refresh_token,
    );
    this.response.cookie("access_token", accessToken);
    return { accessToken };
  }

  @authenticate("jwt")
  @post("/logout", {
    responses: {
      "200": {
        description: "Logout",
        content: {
          "application/json": {
            schema: {
              type: "object",
            },
          },
        },
      },
    },
  })
  async logout(): Promise<object> {
    this.response.clearCookie("refresh_token");
    this.response.clearCookie("access_token");
    return {
      message: "you are logged out",
    };
  }
}
