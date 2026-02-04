import { router } from "./init"
import { tenantRouter } from "./routers/tenant"

export const appRouter = router({
  tenant: tenantRouter,
})

export type AppRouter = typeof appRouter
