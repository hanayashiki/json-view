import { authenticateMiddleware } from "../middlewares/authenticate";
import { baseProcedure, router } from "../trpc";

export const fileRouter = router({
  myFiles: baseProcedure
    .use(authenticateMiddleware())
    .query(async ({ ctx }) => {
      return ctx.fileService.myFiles();
    }),
});
