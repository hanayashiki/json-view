import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

import { UserService } from "./services/UserService";
import { createClient } from "@/json-view-server/dbschema/edgeql-js";

export const createContext = async (
  opts?: trpcExpress.CreateExpressContextOptions
) => {
  const edgedb = createClient();

  const userService = new UserService(edgedb);

  return {
    edgedb,
    userService,
    req: opts?.req,
    res: opts?.res,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
