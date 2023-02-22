import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

import { createContext } from "./context";
import { appRouter } from "./router";
import packageJson from "../package.json";
const app = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const server = app.listen(4000, () => {
  console.info(
    `${packageJson["name"]}@${packageJson["version"]} starting on 4000`
  );
});

process.on("exit", () => server.closeAllConnections());
