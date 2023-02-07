import { TRPCError } from "@trpc/server";

import { baseMiddleware } from "@/json-view-server/src/trpc";

export interface AuthenticateMiddlewareOptions {
  isAuthenticated?: boolean;
}

export const authenticateMiddleware = (
  opts: AuthenticateMiddlewareOptions = {}
) =>
  baseMiddleware(async ({ ctx, next }) => {
    const { isAuthenticated = true } = opts;

    const authorization = ctx.req?.headers.authorization;

    if (!authorization && isAuthenticated) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message:
          "This is a isAuthenticated == true procedure, but headers.authorization is not provided",
      });
    }

    if (authorization) {
      const user = await ctx.userService.authenticate(
        authorization.split(" ")[1] ?? ""
      );

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid token",
        });
      }
    }

    return next();
  });
