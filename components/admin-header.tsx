"use client";

import { Bell, Search, Moon, Sun, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { LogoutButton, useAuth } from "@/components/auth";
import { S3_URL } from "@/lib/api-data-store";

export function AdminHeader() {
  const { theme, toggleTheme } = useTheme();
  const { userData } = useAuth();

  // Extract user info with fallbacks
  const userName = userData?.name || "Admin User";
  const userType = userData?.type || "admin";
  const userInitials = userName.substring(0, 2).toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex flex-1 items-center gap-4">
        {/* <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-9" />
        </div> */}
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="secondary">3 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex w-full items-start justify-between">
                  <span className="font-medium">Subscription expiring</span>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Acme Corp subscription expires in 7 days
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex w-full items-start justify-between">
                  <span className="font-medium">New user registered</span>
                  <span className="text-xs text-muted-foreground">5h ago</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  John Doe joined React Fundamentals course
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex w-full items-start justify-between">
                  <span className="font-medium">Course completed</span>
                  <span className="text-xs text-muted-foreground">1d ago</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Sarah Wilson completed Advanced TypeScript
                </span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 pl-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={S3_URL + userData?.logo} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {userType}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex w-full items-center">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex w-full items-center">
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/users" className="flex w-full items-center">
                Users
              </Link>
            </DropdownMenuItem>

            {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Preferences</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <LogoutButton
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive px-2 py-1.5 text-sm"
              showConfirmation={true}
            >
              Log out
            </LogoutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
