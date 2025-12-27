import { OrganizationProfile } from "@/components/organization/organization-profile"
import { OrganizationSettings } from "@/components/organization/organization-settings"
import { OrganizationPermissions } from "@/components/organization/organization-permissions"

export default function OrganizationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Organization Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your organization profile and settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <OrganizationProfile />
        <OrganizationSettings />
      </div>

      <OrganizationPermissions />
    </div>
  )
}
