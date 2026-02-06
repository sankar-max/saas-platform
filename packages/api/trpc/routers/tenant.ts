import { router, tenantProcedure } from "../init"

export const tenantRouter = router({
  getCurrent: tenantProcedure.query(({ ctx }) => {
    return {
      orgId: ctx.orgId,
      orgSlug: ctx.orgSlug || "unknown",
      message: `Welcome to tenant ${ctx.orgId}!`,
    }
  }),
})
