// apps/client-web/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Define public routes – make /orgs fully public (no redirect logic applied)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/orgs(.*)", // Critical: Covers /orgs and any subpaths/query params
])

export default clerkMiddleware(
  async (auth, req) => {
    const { userId, orgId, orgSlug, redirectToSignIn } = await auth()

    console.log(
      `Middleware running on: ${req.nextUrl.pathname}, userId=${userId}, orgId=${orgId}`
    ) // Debug – remove later

    if (!userId && !isPublicRoute(req)) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    // 2. If logged in but no active organization → redirect to org picker
    // Only redirect if NOT already on a public route (anti-loop)
    if (userId && !orgId && !isPublicRoute(req)) {
      return NextResponse.redirect(new URL("/orgs", req.url))
    }

    // 3. Propagate tenant/org context via headers
    if (orgId) {
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set("x-tenant-id", orgId)
      requestHeaders.set("x-tenant-slug", orgSlug || "")

      return NextResponse.next({
        request: { headers: requestHeaders },
      })
    }

    return NextResponse.next()
  },
  {
    // Auto-activate org for /org/:slug paths
    organizationSyncOptions: {
      organizationPatterns: ["/org/:slug", "/org/:slug/(.*)"],
    },
  }
)

// Matcher: Covers dynamic org routes + general pages
export const config = {
  matcher: [
    "/org/:slug(.*)", // Explicit for dynamic org dashboards
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)", // General dynamic routes
    "/(api|trpc)(.*)",
  ],
}
