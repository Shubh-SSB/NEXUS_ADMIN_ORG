import type React from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalLoader } from "@/components/global-loader";
import { SnackbarProvider } from "notistack";
import NotistackProvider from "@/components/snackbarprovider";
import { AuthGuard } from "@/components/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard
      redirectTo="/login"
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse">Checking authentication...</div>
        </div>
      }
    >
      <ThemeProvider>
        <NotistackProvider>
          <div className="flex h-screen overflow-hidden bg-background">
            <AdminSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <AdminHeader />
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
            <GlobalLoader />
          </div>
        </NotistackProvider>
      </ThemeProvider>
    </AuthGuard>
  );
}
