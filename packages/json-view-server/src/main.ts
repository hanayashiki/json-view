import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

import { createContext } from "./context";
import { appRouter } from "./router";
import packageJson from "../package.json";

const app = express();

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.info(
    `${packageJson["name"]}@${packageJson["version"]} starting on 4000`
  );
});
