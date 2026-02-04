"use client"
import { OrganizationList, OrganizationSwitcher } from "@clerk/nextjs"

export default function OrgsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Your Organizations
        </h1>

        {/* Organization List – navigate on select/create */}
        <OrganizationList
          afterSelectOrganizationUrl={(organization) =>
            `/org/${organization.slug}`
          }
          afterCreateOrganizationUrl={(organization) =>
            `/org/${organization.slug}`
          }
          appearance={{
            elements: {
              organizationList: "space-y-4",
              organizationPreview:
                "p-5 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all duration-200",
              organizationPreviewMainIdentifier:
                "text-lg font-medium text-gray-900",
              organizationPreviewSecondaryIdentifier: "text-sm text-gray-600",
            },
          }}
        />

        {/* Divider */}
        <div className="my-10 border-t border-gray-200"></div>

        {/* Switcher for quick switching */}
        <div className="text-center">
          <OrganizationSwitcher
            afterSelectOrganizationUrl={(organization) =>
              `/org/${organization.slug}`
            }
            appearance={{
              elements: {
                organizationSwitcherTrigger:
                  "inline-flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-md",
                organizationSwitcherTriggerIcon: "h-5 w-5",
              },
            }}
          />
        </div>

        {/* Small hint */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Select an organization to access your dashboard
        </p>
      </div>
    </div>
  )
}
