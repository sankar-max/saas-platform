import { db } from "@saas/db";
import { forms } from "@saas/db/schema/forms";
import { eq, and } from "drizzle-orm";
import { randomUUID } from "crypto";

export const FormService = {
  async listByOrg(orgId: string) {
    return db
      .select({
        id: forms.id,
        name: forms.name,
        description: forms.description,
        isPublished: forms.isPublished,
        createdAt: forms.createdAt,
      })
      .from(forms)
      .where(eq(forms.orgId, orgId))
      .orderBy(forms.createdAt);
  },

  async create(data: { name: string; description?: string; orgId: string }) {
    const [newForm] = await db
      .insert(forms)
      .values({
        id: randomUUID(),
        orgId: data.orgId,
        name: data.name,
        description: data.description ?? null,
        schema: {},
        isPublished: false,
      })
      .returning();

    return newForm;
  },

  async getById(id: string, orgId: string) {
    const [form] = await db
      .select()
      .from(forms)
      .where(and(eq(forms.id, id), eq(forms.orgId, orgId)));
    
    return form;
  }
};
