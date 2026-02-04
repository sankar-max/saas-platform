import { z } from 'zod';
import { router, tenantProcedure } from '../init';
import { db } from '@saas/db';
import { forms } from '@saas/db/schema/forms';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const formsRouter = router({
 list: tenantProcedure.query(async ({ ctx }) => {
  return db
   .select({
    id: forms.id,
    name: forms.name,
    description: forms.description,
    isPublished: forms.isPublished,
    createdAt: forms.createdAt,
   })
   .from(forms)
   .where(eq(forms.orgId, ctx.orgId!))
   .orderBy(forms.createdAt);
 }),

 create: tenantProcedure
  .input(
   z.object({
    name: z.string().min(1),
    description: z.string().optional(),
   })
  )
  .mutation(async ({ ctx, input }) => {
   try {
    const [newForm] = await db
     .insert(forms)
     .values({
      id: randomUUID(),
      orgId: ctx.orgId!,
      name: input.name,
      description: input.description ?? null,
      schema: {}, // empty for now
      isPublished: false,
     })
     .returning();

    return newForm;
   } catch (error) {
    console.error("Error creating form:", error);
    throw error;
   }
  }),
});