import { pgTable, uuid, text, jsonb, timestamp, boolean } from 'drizzle-orm/pg-core';

export const forms = pgTable('forms', {
 id: uuid('id').defaultRandom().primaryKey(),
 orgId: text('org_id').notNull(),              // Clerk org_xxx string ID
 name: text('name').notNull(),
 description: text('description'),
 schema: jsonb('schema').$type<any>().default({}).notNull(), // AI-ready schema
 isPublished: boolean('is_published').default(false).notNull(),
 createdAt: timestamp('created_at').defaultNow().notNull(),
 updatedAt: timestamp('updated_at').defaultNow().notNull(),
});