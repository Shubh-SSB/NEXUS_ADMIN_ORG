"use client"

import { useState } from "react"
import { Shield, Mail, Phone, MapPin, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="font-serif text-3xl font-bold tracking-tight">Profile Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="shadow-lg shadow-primary/20">
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Sidebar - Profile Overview */}
        <div className="lg:col-span-4">
          <Card className="border-border/50 bg-background/50 backdrop-blur-xl shadow-xl">
            <CardContent className="pt-10">
              <div className="flex flex-col items-center text-center">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-primary/20 shadow-2xl transition-transform duration-300 group-hover:scale-105">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" />
                    <AvatarFallback className="text-2xl">AD</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-9 w-9 rounded-full border border-border bg-background/80 backdrop-blur shadow-lg transition-all hover:bg-background"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-6 space-y-1">
                  <h3 className="font-serif text-2xl font-semibold">Admin User</h3>
                  <p className="text-sm text-muted-foreground">Super Administrator</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                      Active
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Joined Jan 2024
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>admin@acme.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 000-0000</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Tabs */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent space-x-8 mb-6">
              <TabsTrigger
                value="general"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-1"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-1"
              >
                Security
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-1"
              >
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 focus-visible:outline-none">
              <Card className="border-border/50 bg-background/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="font-serif">Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="Admin" className="bg-background/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="User" className="bg-background/30" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="admin@acme.com" className="bg-background/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      rows={4}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us a little about yourself..."
                      defaultValue="Administrator for the Acme Corporation Learning Management System. Focused on engineering excellence and team growth."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 focus-visible:outline-none">
              <Card className="border-border/50 bg-background/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="font-serif">Password</CardTitle>
                  <CardDescription>Change your password to keep your account secure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="bg-background/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="bg-background/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="bg-background/30" />
                  </div>
                  <Button variant="outline">Update Password</Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-background/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Authentication App</p>
                    <p className="text-xs text-muted-foreground">Use an app like Google Authenticator to get codes.</p>
                  </div>
                  <Switch />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 focus-visible:outline-none">
              <Card className="border-border/50 bg-background/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="font-serif">Email Notifications</CardTitle>
                  <CardDescription>Choose what updates you want to receive via email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">New Course Registrations</p>
                      <p className="text-xs text-muted-foreground">Notify me when a new student joins a course.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Course Completion Reports</p>
                      <p className="text-xs text-muted-foreground">
                        Weekly digest of student progress and completions.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">System Updates</p>
                      <p className="text-xs text-muted-foreground">
                        Important news about platform features and maintenance.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
