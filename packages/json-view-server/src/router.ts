import { userRouter } from "./routes/user";
import { mergeRouters } from "./trpc";

export const appRouter = mergeRouters(userRouter);

export type AppRouter = typeof appRouter;
