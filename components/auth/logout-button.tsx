"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useAuth } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import LogoutModal from "@/components/modals/logout";

interface LogoutButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
  showConfirmation?: boolean;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = "outline",
  size = "default",
  className = "",
  children = "Logout",
  showConfirmation = false,
}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    if (showConfirmation) {
      setShowModal(true);
    } else {
      handleDirectLogout();
    }
  };

  const handleDirectLogout = () => {
    try {
      enqueueSnackbar("Logged out successfully", { variant: "success" });

      // Clear auth data and redirect with refresh
      setTimeout(() => {
        logout();
        router.replace("/login");
        // Force page refresh to reset theme/state
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }, 200);
    } catch (error) {
      console.error("Logout error:", error);
      enqueueSnackbar("Error during logout", { variant: "error" });
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleLogoutClick}
      >
        {children}
      </Button>

      {/* Independent Modal - renders at document body level */}
      <LogoutModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
