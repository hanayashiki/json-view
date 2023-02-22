import { authenticateMiddleware } from "../middlewares/authenticate";
import { FileModel } from "../models/FileModel";
import { baseProcedure, router } from "../trpc";

export const fileRouter = router({
  myFiles: baseProcedure
    .use(authenticateMiddleware())
    .query(async ({ ctx }) => {
      return ctx.fileService.myFiles();
    }),
  updateFile: baseProcedure
    .use(authenticateMiddleware())
    .input(FileModel.UpdateDTO)
    .mutation(async ({ ctx, input }) => {
      return ctx.fileService.updateFile(input);
    }),
});
