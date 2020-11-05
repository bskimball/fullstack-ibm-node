import { Entity, model, property } from "@loopback/repository";

@model({
  name: "TOKEN",
})
export class RefreshToken extends Entity {
  @property({
    type: "string",
    id: true,
    generated: false,
    name: "ID",
    defaultFn: "uuidv4",
  })
  id?: string;

  @property({
    type: "string",
    required: true,
    name: "USERID",
  })
  userId: string;

  @property({
    type: "string",
    required: true,
    name: "TOKEN",
  })
  refreshToken: string;

  constructor(data?: Partial<RefreshToken>) {
    super(data);
  }
}

export interface RefreshTokenRelations {
  // describe navigational properties here
}

export type RefreshTokenWithRelations = RefreshToken & RefreshTokenRelations;
