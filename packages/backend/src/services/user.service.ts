import { UserService as LBUserService } from "@loopback/authentication";
import { repository } from "@loopback/repository";
import { HttpErrors } from "@loopback/rest";
import { securityId, UserProfile } from "@loopback/security";
import { compare } from "bcryptjs";
import { User } from "../models";
import { UserRepository } from "../repositories";

export type Credentials = {
  email: string;
  password: string;
  remember: boolean;
};

export class UserService implements LBUserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    console.log("my service");
    const invalidCredentialsError = "Invalid email or password.";

    const foundUser = await this.userRepository.findOne({
      where: { email: credentials.email },
    });
    console.log({ foundUser });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.userRepository.findCredentials(
      foundUser.id,
    );
    console.log({ credentialsFound });
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    );
    console.log({ passwordMatched });
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    return {
      // @ts-ignore
      [securityId]: user.id.toString(),
      name: user.username,
      id: user.id,
      email: user.email,
    };
  }

  //function to find user by id
  async findUserById(id: number) {
    const userNotfound = "invalid User";
    const foundUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(userNotfound);
    }
    return foundUser;
  }
}
