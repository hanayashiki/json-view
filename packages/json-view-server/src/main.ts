import * as trpcExpress from "@trpc/server/adapters/express";
import compression from "compression";
import cors from "cors";
import express, { RequestHandler } from "express";
import sirv from "sirv";

import { createContext } from "./context";
import { appRouter } from "./router";
import packageJson from "../package.json";

const app = express();

const assets: RequestHandler =
  process.env.NODE_ENV === "production"
    ? sirv("../json-view-client/dist", {
        maxAge: 31536000, // 1Y
        immutable: true,
      })
    : (_res, _req, next) => next();

app.use(compression(), assets, cors());

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
