import z from "zod";
import { router, protectedProcedure, publicProcedure } from "../index";
import { visitor } from "@rntu-visit/db/schema/visitor";
import { eq, desc } from "drizzle-orm";
import { db } from "@rntu-visit/db";

export const visitorRouter = router({
  // Create a new visitor registration
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        phone: z
          .string()
          .regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"),
        purpose: z.string().min(1, "Please select a purpose"),
        organization: z
          .string()
          .min(2, "Organization must be at least 2 characters"),
        designation: z.string().min(1, "Please select a designation"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [newVisitor] = await db
        .insert(visitor)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();
      return newVisitor;
    }),

  // Get all visitors (admin/staff use)
  getAll: protectedProcedure.query(async () => {
    return await db.select().from(visitor).orderBy(desc(visitor.createdAt));
  }),

  // Get current user's visitor registrations
  getMine: protectedProcedure.query(async ({ ctx }) => {
    return await db
      .select()
      .from(visitor)
      .where(eq(visitor.userId, ctx.session.user.id))
      .orderBy(desc(visitor.createdAt));
  }),

  // Get a specific visitor by ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const [visitorRecord] = await db
        .select()
        .from(visitor)
        .where(eq(visitor.id, input.id));
      return visitorRecord;
    }),

  // Update visitor details
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(2).optional(),
        phone: z
          .string()
          .regex(/^\+?[1-9]\d{9,14}$/)
          .optional(),
        purpose: z.string().min(1).optional(),
        organization: z.string().min(2).optional(),
        designation: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input;

      const [updatedVisitor] = await db
        .update(visitor)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(visitor.id, id))
        .returning();

      return updatedVisitor;
    }),

  // Delete a visitor registration
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await db.delete(visitor).where(eq(visitor.id, input.id));
    }),
});
