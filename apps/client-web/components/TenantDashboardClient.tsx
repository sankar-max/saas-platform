"use client"

import { trpc } from "@saas/api/client"
import { useState } from "react"

interface Props {
  slug: string
  initialOrgId: string
  initialOrgSlug: string
}

export default function TenantDashboardClient() {
  const utils = trpc.useUtils()
  const { data: forms, isLoading: formsLoading } = trpc.forms.list.useQuery()

  const createForm = trpc.forms.create.useMutation({
    onSuccess: () => {
      utils.forms.list.invalidate()
      setFormName("")
      setFormDesc("")
    },
  })

  const [formName, setFormName] = useState("")
  const [formDesc, setFormDesc] = useState("")

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Your existing header / stats */}

      <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Forms</h2>
          <button
            onClick={() => {
              if (formName.trim()) {
                createForm.mutate({ name: formName, description: formDesc })
              }
            }}
            disabled={createForm.isPending || !formName.trim()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {createForm.isPending ? "Creating..." : "Create Form"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            value={formName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormName(e.target.value)
            }
            placeholder="Form name (e.g. Customer Feedback)"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={formDesc}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormDesc(e.target.value)
            }
            placeholder="Description (optional)"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {formsLoading ? (
          <p className="text-gray-500">Loading your forms...</p>
        ) : forms?.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No forms yet — create one above!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {forms?.map((form) => (
              <div
                key={form.id}
                className="p-6 border rounded-lg bg-white shadow hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">{form.name}</h3>
                {form.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {form.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-3">
                  {form.isPublished ? "Published" : "Draft"} •{" "}
                  {new Date(form.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
