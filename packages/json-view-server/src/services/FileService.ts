import { Client } from "edgedb";

import { UserService } from "./UserService";
import { FileModel } from "../models/FileModel";
import e from "@/json-view-server/dbschema/edgeql-js";

export class FileService {
  constructor(private edgedb: Client, private userService: UserService) {}

  async myFiles(): Promise<FileModel.DO[]> {
    return await e
      .select(e.File, (file) => ({
        ...e.File["*"],
        creator: e.User["*"],
        filter: e.op(
          file["<files[is User]"].id,
          "=",
          e.uuid(this.userService.user!.id)
        ),
        limit: 10,
      }))
      .run(this.edgedb);
  }
}
