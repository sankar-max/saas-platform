"use client"

import { trpc } from "@saas/api/trpc/client"

interface Props {
  slug: string
  initialOrgId: string
  initialOrgSlug: string
}

export default function TenantDashboardClient({
  slug,
  initialOrgId,
  initialOrgSlug,
}: Props) {
  const { data, isLoading, error } = trpc.tenant.getCurrent.useQuery(
    undefined,
    {
      // You can add initialData if you want to avoid flicker
      // initialData: { orgId: initialOrgId, orgSlug: initialOrgSlug }
    }
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading tenant data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error.message}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Dashboard for{" "}
          <span className="text-indigo-600">{initialOrgSlug}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
            <h2 className="text-xl font-semibold text-indigo-800 mb-3">
              Organization ID
            </h2>
            <p className="text-gray-700 font-mono break-all">{initialOrgId}</p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-3">
              URL Slug
            </h2>
            <p className="text-gray-700 font-mono">{slug}</p>
          </div>
        </div>

        <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-auto">
          <h2 className="text-xl font-semibold text-white mb-4">
            tRPC Response:
          </h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/orgs"
            className="inline-block px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Switch Organization
          </a>
        </div>
      </div>
    </div>
  )
}
