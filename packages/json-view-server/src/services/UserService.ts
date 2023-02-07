import { faker } from "@faker-js/faker";
import { TRPCError } from "@trpc/server";
import { Client } from "edgedb";

import { UserModel } from "../models/UserModel";
import { hashToken } from "../utils/crypto";
import e from "@/json-view-server/dbschema/edgeql-js";

export class UserService {
  constructor(private edgedb: Client) {}

  user?: UserModel.DO;

  async authenticate(clearToken: string): Promise<UserModel.DO | undefined> {
    const user = await this.getUserByToken(clearToken);
    this.user = user || undefined;

    return this.user;
  }

  async getUserByToken(clearToken: string): Promise<UserModel.DO | undefined> {
    return (
      (await e
        .select(e.User, () => ({
          ...e.User["*"],
          filter_single: { token: hashToken(clearToken) },
        }))
        .run(this.edgedb)) || undefined
    );
  }

  async createUser(dto: UserModel.CreateDTO): Promise<UserModel.DO> {
    const isUnique = !(await this.getUserByToken(dto.token));

    if (!isUnique) {
      throw new TRPCError({
        message: "The token already exists. ",
        code: "CONFLICT",
      });
    }

    await e
      .insert(e.User, {
        token: hashToken(dto.token),
        username: faker.word.adjective() + faker.word.noun(),
      })
      .run(this.edgedb);

    return (await this.getUserByToken(dto.token))!;
  }
}
