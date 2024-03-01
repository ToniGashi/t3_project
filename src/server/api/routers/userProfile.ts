import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

export const userProfileRouter = createTRPCRouter({
  getProfileById: publicProcedure.input(z.string()).query(async ( {input} ) => {
    const user = await clerkClient.users.getUserList({userId: [input]});
    if(!user[0]) throw new TRPCError({code:'NOT_FOUND', message:'Could not find user with the given username'});
    return user[0];
  })
})
