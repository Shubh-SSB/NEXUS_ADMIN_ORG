"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useAuth } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { LogOut, X, AlertTriangle } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  title = "Confirm Logout",
  message = "Are you sure you want to logout? You will need to login again to access your account.",
}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleLogout = async (event?: React.MouseEvent) => {
    console.log("Logout button clicked"); // Debug log
    event?.preventDefault();
    event?.stopPropagation();

    setIsLoggingOut(true);

    try {
      console.log("Starting logout process"); // Debug log
      enqueueSnackbar("Logging out...", {
        variant: "info",
        className: "z-[999]",
      });

      // Clear auth data and redirect with refresh
      setTimeout(() => {
        console.log("Executing logout and redirect"); // Debug log
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
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => {
    if (!isLoggingOut) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      style={{ margin: 0, padding: "1rem" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={handleCancel}
        style={{ pointerEvents: "auto" }}
      />

      {/* Modal */}
      <div
        className="relative bg-white dark:bg-background rounded-xl shadow-2xl w-full max-w-md mx-auto p-6 animate-in fade-in-0 zoom-in-95 duration-300 border border-border z-10"
        style={{ maxWidth: "28rem", pointerEvents: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          title="Close logout modal"
          onClick={(e) => {
            e.stopPropagation();
            handleCancel();
          }}
          disabled={isLoggingOut}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          style={{ pointerEvents: "auto" }}
        >
          <X size={20} />
        </button>

        {/* Icon */}
        {/* <div className="flex items-center justify-center w-14 h-14 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full">
          <AlertTriangle className="w-7 h-7 text-red-600 dark:text-red-400" />
        </div> */}

        {/* Content */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3" style={{ pointerEvents: "auto" }}>
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
            disabled={isLoggingOut}
            className="flex-1 h-11 cursor-pointer disabled:cursor-not-allowed"
            style={{ pointerEvents: "auto" }}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleLogout(e);
            }}
            disabled={isLoggingOut}
            className="flex-1 flex items-center justify-center gap-2 h-11 cursor-pointer disabled:cursor-not-allowed"
            style={{ pointerEvents: "auto" }}
          >
            {isLoggingOut ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Logging out...
              </>
            ) : (
              <>
                <LogOut size={16} />
                Logout
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default LogoutModal;
