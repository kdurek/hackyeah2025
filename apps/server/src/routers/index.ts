import type { RouterClient } from "@orpc/server";
import { actorRouter } from "@/routers/actor";

export const appRouter = {
  actor: actorRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
