import { authenticateMiddleware } from "../middlewares/authenticate";
import { baseProcedure, router } from "../trpc";

export const userRouter = router({
  me: baseProcedure.use(authenticateMiddleware()).query(async ({ ctx }) => {
    return ctx.userService.user!;
  }),
});
