import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@saas/api/trpc/root"
import { auth } from "@clerk/nextjs/server"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => {
      const { userId, orgId, orgSlug } = await auth()
      if (!orgId) {
        throw new Error("No active organization")
      }
      if (!orgSlug) {
        throw new Error("No active organization slug")
      }

      return {
        userId,
        orgId,
        orgSlug,
      }
    },
  })

export { handler as GET, handler as POST }
