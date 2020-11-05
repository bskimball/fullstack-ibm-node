import { belongsTo, Entity, model, property } from "@loopback/repository";
import { User } from "./user.model";

@model({
  name: "CREDENTIAL",
})
export class UserCredential extends Entity {
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
    required: true,
    name: "PASSWORD",
  })
  password: string;

  @belongsTo(
    () => User,
    { keyTo: "id", keyFrom: "userId", name: "credential" },
    { name: "USERID" },
  )
  userId: string;

  constructor(data?: Partial<UserCredential>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredential &
  UserCredentialsRelations;
