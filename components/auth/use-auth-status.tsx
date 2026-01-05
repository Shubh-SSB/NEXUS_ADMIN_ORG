"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { isAuthenticated, getAuthToken } from "@/lib/auth";

export interface UseAuthStatusOptions {
  redirectTo?: string;
  showNotification?: boolean;
  notificationMessage?: string;
  onUnauthorized?: () => void;
}

export interface UseAuthStatusReturn {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  checkAuth: () => boolean;
}

/**
 * Hook for checking authentication status with optional redirect
 * Provides real-time auth status without full context overhead
 */
export const useAuthStatus = (
  options: UseAuthStatusOptions = {}
): UseAuthStatusReturn => {
  const {
    redirectTo = "/login",
    showNotification = true,
    notificationMessage = "Session expired. Please login again.",
    onUnauthorized,
  } = options;

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const checkAuth = (): boolean => {
    const authenticated = isAuthenticated();
    const currentToken = getAuthToken();

    setIsAuth(authenticated);
    setToken(currentToken);

    if (!authenticated) {
      if (showNotification) {
        enqueueSnackbar(notificationMessage, {
          variant: "warning",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
      }
      // router.replace(redirectTo);
      if (onUnauthorized) {
        onUnauthorized();
      } else if (redirectTo) {
        router.push(redirectTo);
      }
    }

    return authenticated;
  };

  useEffect(() => {
    const performCheck = () => {
      checkAuth();
      setIsLoading(false);
    };

    // Initial check
    performCheck();

    // Listen for storage changes (e.g., logout in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        performCheck();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return {
    isAuthenticated: isAuth,
    token,
    isLoading,
    checkAuth,
  };
};
