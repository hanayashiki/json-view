import { Client } from "edgedb";

import { UserModel } from "../models/UserModel";
import { hashToken } from "../utils/crypto";
import e from "@/json-view-server/dbschema/edgeql-js";

export class UserService {
  constructor(private edgedb: Client) {}

  user?: UserModel.DO;

  async authenticate(clearToken: string): Promise<UserModel.DO | undefined> {
    const user = await e
      .select(e.User, () => ({
        ...e.User["*"],
        filter_single: { token: hashToken(clearToken) },
      }))
      .run(this.edgedb);
    this.user = user || undefined;

    return this.user;
  }
}
