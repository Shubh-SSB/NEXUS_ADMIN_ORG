"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { isAuthenticated } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  showNotification?: boolean;
  notificationMessage?: string;
}

/**
 * A lightweight, fast route protection component
 * This performs immediate client-side checks without API calls
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  ),
  redirectTo = "/login",
  showNotification = true,
  notificationMessage = "Unauthorized! Please login first.",
}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Perform immediate auth check
  React.useLayoutEffect(() => {
    const checkAuthentication = () => {
      // Fast localStorage check - no API calls
      if (!isAuthenticated()) {
        if (showNotification) {
          enqueueSnackbar(notificationMessage, {
            variant: "error",
            preventDuplicate: true,
            autoHideDuration: 3000,
          });
        }

        // Immediate redirect
        router.replace(redirectTo);
        return false;
      }
      return true;
    };

    checkAuthentication();
  }, [
    router,
    redirectTo,
    showNotification,
    notificationMessage,
    enqueueSnackbar,
  ]);

  // If not authenticated, don't render children
  if (!isAuthenticated()) {
    return fallback as React.ReactElement;
  }

  // Render protected content
  return <>{children}</>;
};

/**
 * Hook for programmatic auth checks in components
 */
export const useAuthCheck = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const requireAuth = (
    redirectTo: string = "/login",
    message: string = "Please login to continue"
  ): boolean => {
    if (!isAuthenticated()) {
      enqueueSnackbar(message, { variant: "error" });
      router.push(redirectTo);
      return false;
    }
    return true;
  };

  return { requireAuth, isAuthenticated: isAuthenticated() };
};
