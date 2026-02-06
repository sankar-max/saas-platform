import { z } from "zod";

export const idSchema = z.string().uuid();
export const cuidSchema = z.string().cuid2?.() ?? z.string();

export const paginationSchema = z.object({
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
});

export const formCreateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
});
