import { authenticateMiddleware } from "../middlewares/authenticate";
import { FileModel } from "../models/FileModel";
import { baseProcedure, router } from "../trpc";

export const fileRouter = router({
  myFiles: baseProcedure
    .use(authenticateMiddleware())
    .query(async ({ ctx }) => {
      return ctx.fileService.myFiles();
    }),
  insertFile: baseProcedure
    .use(authenticateMiddleware())
    .input(FileModel.InsertDTO)
    .mutation(async ({ ctx, input }) => {
      return ctx.fileService.insertFile(input);
    }),
  updateFile: baseProcedure
    .use(authenticateMiddleware())
    .input(FileModel.UpdateDTO)
    .mutation(async ({ ctx, input }) => {
      return ctx.fileService.updateFile(input);
    }),
});
