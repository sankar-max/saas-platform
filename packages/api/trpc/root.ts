import { router } from "./init"
import { tenantRouter } from "./routers/tenant"
import { formsRouter } from "./routers/forms"

export const appRouter = router({
  tenant: tenantRouter,
  forms: formsRouter,
})

export type AppRouter = typeof appRouter
