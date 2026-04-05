import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  /**
   * Public greeting endpoint.
   * @input text - Name to greet
   * @returns Greeting string
   */
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  /**
   * Create a new post. Requires authenticated session.
   * @input name - Post title (min 1 char)
   * @throws {TRPCError} UNAUTHORIZED if not logged in
   */
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  /**
   * Fetch the most recently created post for the current user.
   * @returns Latest {@link Post} or null if none exist
   */
  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),

  /**
   * Example protected endpoint — visible only to authenticated users.
   * @returns Secret message string
   */
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
