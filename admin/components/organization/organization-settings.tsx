"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function OrganizationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Domain Settings</CardTitle>
        <CardDescription>Configure allowed email domains and access controls</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="allowed-domains">Allowed Email Domains</Label>
          <Input id="allowed-domains" placeholder="acme.com, acme.io" defaultValue="acme.com" />
          <p className="text-xs text-muted-foreground">Users with these email domains can self-register</p>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label>Require Email Verification</Label>
            <p className="text-sm text-muted-foreground">New users must verify their email address</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label>Allow Self-Registration</Label>
            <p className="text-sm text-muted-foreground">Users can sign up without an invitation</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label>Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">Require 2FA for all organization members</p>
          </div>
          <Switch />
        </div>

        <Button className="w-full">Save Settings</Button>
      </CardContent>
    </Card>
  )
}
