import { authenticateMiddleware } from "../middlewares/authenticate";
import { UserModel } from "../models/UserModel";
import { baseProcedure, router } from "../trpc";

export const userRouter = router({
  me: baseProcedure.use(authenticateMiddleware()).query(async ({ ctx }) => {
    return ctx.userService.user!;
  }),
  createUser: baseProcedure
    .input(UserModel.CreateDTO)
    .mutation(async ({ ctx, input }) => {
      return ctx.userService.createUser(input);
    }),
});
