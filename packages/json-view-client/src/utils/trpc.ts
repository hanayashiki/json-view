import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@/json-view-server/src/router";

export const trpc = createTRPCReact<AppRouter>();
