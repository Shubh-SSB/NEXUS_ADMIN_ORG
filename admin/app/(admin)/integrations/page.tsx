import { IntegrationsList } from "@/components/integrations/integrations-list"

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground mt-1">Connect external services and tools</p>
      </div>

      <IntegrationsList />
    </div>
  )
}
