import { z } from "zod";

export namespace UserModel {
  export const DO = z.object({
    username: z.string().min(1).max(30),
    token: z.string().min(1).max(44),
    created_at: z.date(),
    updated_at: z.date(),
  });
  export interface DO extends z.TypeOf<typeof DO> {}

  export const VO = DO.omit({ token: true });
  export interface VO extends z.TypeOf<typeof VO> {}

  export const CreateDTO = DO.pick({ token: true });
}
