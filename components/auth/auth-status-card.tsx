"use client";
import React from "react";
import { useAuth, useAuthStatus, LogoutButton } from "@/components/auth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Example component demonstrating auth system usage
 * This can be used in your dashboard or admin components
 */
export const AuthStatusCard: React.FC = () => {
  const { isLoggedIn, token } = useAuth();
  const { isAuthenticated: statusCheck } = useAuthStatus({
    showNotification: false, // Disable notifications for this demo
  });

  // Extract some token info (be careful with sensitive data)
  const tokenPreview = token ? `${token.substring(0, 10)}...` : "No token";

  return (
    <Card className="p-6 max-w-md">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Authentication Status</h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <Badge variant={isLoggedIn ? "default" : "destructive"}>
              {isLoggedIn ? "Authenticated" : "Not Authenticated"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Token:</span>
            <span className="text-sm font-mono">{tokenPreview}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status Check:</span>
            <Badge variant={statusCheck ? "default" : "destructive"}>
              {statusCheck ? "Valid" : "Invalid"}
            </Badge>
          </div>
        </div>

        <div className="pt-4 border-t">
          <LogoutButton
            variant="outline"
            size="sm"
            className="w-full"
            showConfirmation={true}
          >
            Logout
          </LogoutButton>
        </div>
      </div>
    </Card>
  );
};
