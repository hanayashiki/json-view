import { Client } from "edgedb";

import { UserService } from "./UserService";
import { FileModel } from "../models/FileModel";
import e from "@/json-view-server/dbschema/edgeql-js";

export class FileService {
  constructor(private edgedb: Client, private userService: UserService) {}

  async myFiles(): Promise<FileModel.ListVO[]> {
    const u = await e
      .select(e.User, () => ({
        files: () => ({
          ...e.File["*"],
          creator: e.User["*"],
          "@open_at": true,
        }),
        filter_single: {
          id: this.userService.user?.id!,
        },
      }))
      .run(this.edgedb);

    return u?.files ?? [];
  }

  async updateFile(dto: FileModel.UpdateDTO) {
    await e
      .update(e.File, (f) => ({
        filter_single: {
          id: e.uuid(dto.id),
        },
        filter: e.op(
          f["<files[is User]"].id,
          "=",
          e.uuid(this.userService.user!.id)
        ),
        set: {
          filename: dto.filename,
          content: dto.content,
        },
      }))
      .run(this.edgedb);

    if (dto["@open_at"]) {
      await e
        .update(e.User, () => ({
          filter_single: {
            id: this.userService.user?.id!,
          },
          set: {
            files: {
              "+=": e.select(e.File, () => ({
                filter_single: {
                  id: dto.id,
                },
                "@open_at": e.datetime(dto["@open_at"]!),
              })),
            },
          },
        }))
        .run(this.edgedb);
    }
  }
}
