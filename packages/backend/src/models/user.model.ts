import { Entity, model, property, hasOne } from "@loopback/repository";
import { UserCredential } from "./user-credential.model";

@model({
  name: "USER",
})
export class User extends Entity {
  @property({
    type: "string",
    id: true,
    generated: false,
    defaultFn: "uuidv4",
    name: "ID",
  })
  id?: string;

  @property({
    type: "string",
    name: "REALM",
  })
  realm?: string;

  @property({
    type: "string",
    required: true,
    name: "EMAIL",
  })
  email: string;

  @property({
    type: "string",
    name: "USERNAME",
  })
  username?: string;

  @property({
    type: "boolean",
    name: "VERIFIED",
  })
  emailVerified?: boolean;

  @property({
    type: "string",
    name: "TOKEN",
  })
  verificationToken?: string;

  @property({
    type: "date",
    name: "CREATED",
    default: () => new Date(),
  })
  createdAt?: string;

  @hasOne(() => UserCredential)
  userCredentials: UserCredential;

  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
