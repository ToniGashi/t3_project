
import { clerkClient } from "@clerk/nextjs";
import { type Post } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

// const filterUserForClient = (tempUser: User) => {
//   return {
//     id: tempUser.id,
//     username: tempUser.username,
//     profileImageUrl: tempUser.profileImageUrl
//   }
// }
export const postRouter = createTRPCRouter({
  getPosts: publicProcedure.query(async ( {ctx} ) => {
    const posts = await ctx.db.post.findMany({
      orderBy: [{createdAt: "desc"}]
    });
    
    const postsWithUser = Promise.all(...[posts.map(async (post: Post) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const currentUser = await clerkClient.users.getUser(post.authorId);
      return {
        ...post,
        username: currentUser.firstName + " " + currentUser.lastName,
        imageUrl:  currentUser.imageUrl
      }
    })]);

    return postsWithUser;
  }),
  postPost: privateProcedure.input(z.object({
    content: z.string().min(1).max(500)
  })).mutation(async ( {ctx, input} ) => {{
    return ctx.db.post.create({data: {
      content: input.content,
      authorId: ctx.currentUserId
      }
    })
  }})
});
