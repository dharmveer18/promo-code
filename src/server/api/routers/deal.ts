import { desc } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { deals } from "~/server/db/schema";

export const dealRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(deals)
      .orderBy(desc(deals.createdAt))
      .limit(50);
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(512),
        url: z.string().url().max(2048),
        price: z.string().max(64).optional(),
        originalPrice: z.string().max(64).optional(),
        store: z.string().min(1).max(256),
        category: z.string().min(1).max(128),
        description: z.string().max(5000).optional(),
        promoCode: z.string().max(128).optional(),
        isFreebie: z.boolean().default(false),
        affiliation: z.string().max(256).optional(),
        startsAt: z.string().optional(),
        expiresAt: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [deal] = await ctx.db
        .insert(deals)
        .values({
          title: input.title,
          url: input.url,
          price: input.price ?? null,
          originalPrice: input.originalPrice ?? null,
          store: input.store,
          category: input.category,
          description: input.description ?? null,
          promoCode: input.promoCode ?? null,
          isFreebie: input.isFreebie,
          affiliation: input.affiliation ?? null,
          startsAt: input.startsAt ? new Date(input.startsAt) : null,
          expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
          submittedById: null,
        })
        .returning();

      return deal;
    }),
});
