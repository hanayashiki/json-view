import { z } from "zod";

import { UserModel } from "./UserModel";

export namespace FileModel {
  export const DO = z.object({
    created_at: z.date(),
    updated_at: z.date(),
    filename: z.string().min(1).max(255),
    content: z.string().max(1024 * 1024),
  });

  export type DO = z.TypeOf<typeof DO>;

  export const ListVO = DO.extend({
    creator: UserModel.DO,
  });

  export type ListVO = z.TypeOf<typeof ListVO>;
}
