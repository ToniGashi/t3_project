import { postRouter } from "./routers/post";
import { userProfileRouter } from "./routers/userProfile";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  userProfile: userProfileRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
