"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export function OrganizationProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Profile</CardTitle>
        <CardDescription>Update your organization details and branding</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed bg-muted">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <Button variant="outline" size="sm">
              Upload Logo
            </Button>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="org-name">Organization Name</Label>
          <Input id="org-name" placeholder="Acme Corporation" defaultValue="Acme Corporation" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="org-description">Description</Label>
          <Textarea
            id="org-description"
            placeholder="Brief description of your organization"
            rows={3}
            defaultValue="A leading technology company focused on innovation and excellence."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="org-website">Website</Label>
          <Input id="org-website" type="url" placeholder="https://acme.com" defaultValue="https://acme.com" />
        </div>

        <Button className="w-full">Save Changes</Button>
      </CardContent>
    </Card>
  )
}
