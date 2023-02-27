import { z } from "zod";

import { UserModel } from "./UserModel";

export namespace FileModel {
  export const DO = z.object({
    id: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    filename: z.string().min(1).max(255),
    content: z.string().max(1024 * 1024),
    "@open_at": z.date().nullable(),
  });

  export type DO = z.TypeOf<typeof DO>;

  export const InsertDTO = DO.pick({
    filename: true,
    content: true,
  });

  export type InsertDTO = z.TypeOf<typeof InsertDTO>;

  export const UpdateDTO = DO.pick({
    filename: true,
    content: true,
    "@open_at": true,
  })
    .partial()
    .extend(DO.pick({ id: true }).shape);

  export type UpdateDTO = z.TypeOf<typeof UpdateDTO>;

  export const ListVO = DO.extend({
    creator: UserModel.DO,
  });

  export type ListVO = z.TypeOf<typeof ListVO>;

  export const VO = ListVO.omit({
    "@open_at": true,
  });

  export type VO = z.TypeOf<typeof VO>;
}
