"use client";

import { useState } from "react";
import { Shield, Mail, Phone, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth";
import Dayjs from "dayjs";
import { S3_URL } from "@/lib/api-data-store";

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const { userData } = useAuth();

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">
            Profile Settings
          </h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Sidebar - Profile Overview */}
        <div className="lg:col-span-4">
          <Card className="border-border/50 bg-background/50 backdrop-blur-xl shadow-xl">
            <CardContent className="pt-10">
              <div className="flex flex-col items-center text-center">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-primary/20 shadow-2xl transition-transform duration-300 group-hover:scale-105">
                    <AvatarImage src={S3_URL + userData?.logo} />
                    <AvatarFallback className="text-2xl">
                      {userData?.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
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
                  <h3 className="text-2xl font-semibold"></h3>
                  <p className="text-sm text-muted-foreground">
                    {userData?.name}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-none"
                    >
                      {userData?.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {userData?.type.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {Dayjs(userData?.createdAt).format("MMMM YYYY")}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{userData?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{userData?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{userData?.address}</span>
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
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-1"
              >
                General
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="general"
              className="space-y-6 focus-visible:outline-none"
            >
              <Card className="border-border/50 bg-background/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Name</Label>
                      <Input
                        id="first-name"
                        defaultValue={userData?.name.split(" ")[0]}
                        className="bg-background/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userData?.email}
                      className="bg-background/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
