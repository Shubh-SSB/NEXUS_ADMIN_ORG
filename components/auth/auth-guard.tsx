"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSnackbar } from "notistack";
import { isAuthenticated } from "@/lib/auth";
import { useAuth } from "./auth-context";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  showNotification?: boolean;
  notificationMessage?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallback = null,
  redirectTo = "/login",
  showNotification = true,
  notificationMessage = "Unauthorized! Please login first.",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoggedIn, checkAuth } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const performAuthCheck = () => {
      // Skip auth check for login page
      if (pathname === redirectTo) {
        setIsChecking(false);
        return;
      }

      const authenticated = checkAuth();

      if (!authenticated) {
        // Show error notification for unauthorized access
        if (showNotification) {
          enqueueSnackbar(notificationMessage, {
            variant: "error",
            preventDuplicate: true,
            autoHideDuration: 3000,
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          });
        }

        // Redirect to login page
        router.replace(redirectTo);
        return;
      }

      setIsChecking(false);
    };

    performAuthCheck();
  }, [
    pathname,
    redirectTo,
    showNotification,
    notificationMessage,
    router,
    enqueueSnackbar,
    checkAuth,
  ]);

  // Show fallback while checking auth
  if (isChecking) {
    return fallback as React.ReactElement;
  }

  // If on login page, always render children
  if (pathname === redirectTo) {
    return <>{children}</>;
  }

  // Only render children if authenticated
  if (isLoggedIn) {
    return <>{children}</>;
  }

  // Return fallback if not authenticated
  return fallback as React.ReactElement;
};

/**
 * Higher-order component version of AuthGuard
 */
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<AuthGuardProps, "children">
) {
  return function AuthGuardedComponent(props: P) {
    return (
      <AuthGuard {...options}>
        <Component {...props} />
      </AuthGuard>
    );
  };
}
