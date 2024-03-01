import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ( {ctx} ) => {
    const posts = await ctx.prisma.post.findMany({
      orderBy: [{createdAt: "desc"}]
    });
    
    const postsWithUser = Promise.all(...[posts.map(async (post) => {
      const currentUser = await clerkClient.users.getUser(post.authorId);
      return {
        ...post,
        username: currentUser.firstName + " " + currentUser.lastName,
        imageUrl:  currentUser.imageUrl
      }
    })]);

    return postsWithUser;
  }),
  getPostsOfUser: publicProcedure.input(z.string()).query(async ( {ctx, input} ) => {
    const posts = await ctx.prisma.post.findMany({
      orderBy: [{createdAt: "desc"}],
      where: {
        authorId: input
      }
    });
    
    const postsWithUser = Promise.all(...[posts.map(async (post) => {
      const currentUser = await clerkClient.users.getUser(post.authorId);
      return {
        ...post,
        username: currentUser.username ?? currentUser.firstName + " " + currentUser.lastName,
        imageUrl:  currentUser.imageUrl
      }
    })]);

    return postsWithUser;
  }),
  getSpecificPostInformation: publicProcedure.input(z.string()).query(async ({ctx, input}) => {
    const post = await ctx.prisma.post.findUnique({where:{id: input}})

    const author = post?.authorId ? await clerkClient.users.getUser(post?.authorId) : undefined

    return post && author ? {
      ...post,
      username: author.username ?? author.firstName + " " + author.lastName,
      imageUrl:  author.imageUrl
    } : undefined
  }),
  postPost: privateProcedure.input(z.object({
    content: z.string().min(1, 'Your post must not be empty').max(500, 'Your post can not have more than 500 characters')
  })).mutation(async ( {ctx, input} ) => {{
    const { success } = await ratelimit.limit(ctx.currentUserId)

    if (!success) {
      throw new TRPCError({ code: "TOO_MANY_REQUESTS"})
    }

    return ctx.prisma.post.create({data: {
      content: input.content,
      authorId: ctx.currentUserId
      }
    })
  }})
});
