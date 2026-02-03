"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  UserCheck,
  UsersRound,
  FileCheck,
  BarChart3,
  Award,
  Plug,
  CreditCard,
  Settings,
  ChevronLeft,
  Building2,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "manager", "trainer"],
  },
  {
    name: "Students",
    href: "/users",
    icon: Users,
    roles: ["admin", "manager"],
  },
  {
    name: "Courses",
    href: "/courses",
    icon: BookOpen,
    roles: ["admin", "manager", "trainer"],
  },
  // {
  //   name: "Assessments",
  //   href: "/assessments",
  //   icon: FileCheck,
  //   roles: ["admin", "manager", "trainer"],
  // },
  // {
  //   name: "Reports",
  //   href: "/reports",
  //   icon: BarChart3,
  //   roles: ["admin", "manager"],
  // },
  // {
  //   name: "Certificates",
  //   href: "/certificates",
  //   icon: Award,
  //   roles: ["admin", "manager"],
  // },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    roles: ["admin", "manager", "trainer"],
  },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const currentRole = "admin"; // This would come from auth context

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(currentRole),
  );

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "relative flex flex-col border-r border-border bg-sidebar transition-[width] duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-4 overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-main-bg">
              <BookOpen className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span
              className={cn(
                "text-lg font-semibold text-sidebar-foreground whitespace-nowrap transition-opacity duration-300",
                collapsed && "opacity-0",
              )}
            >
              LMS Admin
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden p-3">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href;
            const NavItem = (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors overflow-hidden",
                  isActive
                    ? "bg-sidebar-accent border-main-bg/55 border text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span
                  className={cn(
                    "whitespace-nowrap transition-opacity duration-300",
                    collapsed && "opacity-0",
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>{NavItem}</TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return NavItem;
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="border-t border-sidebar-border p-3 overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full transition-all duration-200 justify-start cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <ChevronLeft
              className={cn(
                "h-5 w-5 shrink-0 transition-transform duration-300 ease-in-out",
                collapsed && "rotate-180",
              )}
            />
            <span
              className={cn(
                "ml-2 whitespace-nowrap transition-opacity duration-300",
                collapsed && "opacity-0",
              )}
            >
              Collapse
            </span>
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
