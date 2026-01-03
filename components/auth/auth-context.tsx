"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  isAuthenticated,
  getAuthToken,
  setAuthToken,
  clearAuthData,
  getUserData,
  setUserData,
} from "@/lib/auth";

interface UserData {
  id: number;
  name: string;
  phone: string;
  email: string;
  website: string | null;
  address: string;
  pincode: string;
  type: string;
  logo: string;
  isActive: boolean;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  userData: UserData | null;
  login: (token: string, userData: UserData) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      // Skip auth initialization on login page after logout
      if (pathname === "/login") {
        setIsLoggedIn(false);
        setToken(null);
        setUserDataState(null);
        setIsInitialized(true);
        return;
      }

      const storedToken = getAuthToken();
      const storedUserData = getUserData();
      const authenticated = isAuthenticated();

      setToken(storedToken);
      setUserDataState(storedUserData);
      setIsLoggedIn(authenticated);
      setIsInitialized(true);
    };

    initializeAuth();
  }, [pathname]);

  const login = (newToken: string, newUserData: UserData) => {
    setAuthToken(newToken);
    setUserData(newUserData);
    setToken(newToken);
    setUserDataState(newUserData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    clearAuthData();
    setToken(null);
    setUserDataState(null);
    setIsLoggedIn(false);
  };

  const checkAuth = (): boolean => {
    const authenticated = isAuthenticated();
    setIsLoggedIn(authenticated);
    return authenticated;
  };

  const value: AuthContextType = {
    isLoggedIn,
    token,
    userData,
    login,
    logout,
    checkAuth,
  };

  // Always render the provider, but with loading state for non-login pages
  if (!isInitialized && pathname !== "/login") {
    return null; // or a loading spinner if you prefer
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
