"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Key, Globe, Webhook } from "lucide-react"

const integrations = [
  {
    id: "1",
    name: "Single Sign-On (SSO)",
    description: "Enable Google and Azure AD authentication",
    icon: Globe,
    status: "configured",
  },
  {
    id: "2",
    name: "Webhooks",
    description: "Send real-time events to external systems",
    icon: Webhook,
    status: "available",
  },
  {
    id: "3",
    name: "API Access",
    description: "Manage API keys and access tokens",
    icon: Key,
    status: "configured",
  },
]

export function IntegrationsList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {integrations.map((integration) => {
        const Icon = integration.icon
        return (
          <Card key={integration.id}>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex items-start justify-between">
                <CardTitle>{integration.name}</CardTitle>
                {integration.status === "configured" && (
                  <Badge variant="secondary" className="bg-green-600">
                    Active
                  </Badge>
                )}
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant={integration.status === "configured" ? "outline" : "default"}>
                {integration.status === "configured" ? "Configure" : "Set Up"}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
