import { fileRouter } from "./routes/file";
import { userRouter } from "./routes/user";
import { mergeRouters } from "./trpc";

export const appRouter = mergeRouters(userRouter, fileRouter);

export type AppRouter = typeof appRouter;
