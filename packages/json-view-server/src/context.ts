import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

// create context based of incoming request
// set as optional here so it can also be re-used for `getStaticProps()`
export const createContext = async (
  opts?: trpcExpress.CreateExpressContextOptions
) => {
  return {
    req: opts?.req,
    res: opts?.res,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
