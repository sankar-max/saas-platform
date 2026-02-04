// apps/client-web/app/org/[slug]/page.tsx
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import TenantDashboardClient from "@/components/TenantDashboardClient"

export default async function OrgDashboard({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { userId, orgId, orgSlug } = await auth()
  const { slug } = await params
  if (!userId) {
    redirect("/sign-in")
  }

  // If slug doesn't match active org → redirect to picker
  if (!orgId || orgSlug !== slug) {
    console.log("Slug mismatch", { requested: slug, active: orgSlug })
    redirect("/orgs")
  }

  // Pass props to client component (where hooks are allowed)
  return (
    <TenantDashboardClient
      slug={slug}
      initialOrgId={orgId}
      initialOrgSlug={orgSlug}
    />
  )
}
