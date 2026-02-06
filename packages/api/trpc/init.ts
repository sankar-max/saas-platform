import { initTRPC } from "@trpc/server"
import superjson from "superjson"

export const createContext = async (opts: { userId: string | null; orgId: string | null; orgSlug: string | null }) => {
  return {
    userId: opts.userId,
    orgId: opts.orgId,
    orgSlug: opts.orgSlug,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

// Export reusable router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new Error("Unauthorized")
  }
  return next({
    ctx: { userId: ctx.userId },
  })
})

export const tenantProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.orgId) {
    throw new Error("No active organization")
  }
  return next({
    ctx: { ...ctx, orgId: ctx.orgId },
  })
})
