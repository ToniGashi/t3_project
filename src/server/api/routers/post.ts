import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getPosts: publicProcedure.query(async ( {ctx} ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return ctx.db.post.findMany();
  })
});
