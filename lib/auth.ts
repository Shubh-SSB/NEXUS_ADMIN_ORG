/**
 * Auth utility functions for token management
 */

export const AUTH_TOKEN_KEY = "token";
export const AUTH_USER_KEY = "user_data";

/**
 * Get the admin token from localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") {
    return null; // Server-side rendering
  }

  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

/**
 * Get user data from localStorage
 */
export const getUserData = (): any | null => {
  if (typeof window === "undefined") {
    return null; // Server-side rendering
  }

  try {
    const userData = localStorage.getItem(AUTH_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error accessing user data from localStorage:", error);
    return null;
  }
};

/**
 * Set the admin token in localStorage
 */
export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") {
    return; // Server-side rendering
  }

  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
};

/**
 * Set user data in localStorage
 */
export const setUserData = (userData: any): void => {
  if (typeof window === "undefined") {
    return; // Server-side rendering
  }

  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error("Error setting user data in localStorage:", error);
  }
};

/**
 * Remove the admin token from localStorage
 */
export const removeAuthToken = (): void => {
  if (typeof window === "undefined") {
    return; // Server-side rendering
  }

  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

/**
 * Remove user data from localStorage
 */
export const removeUserData = (): void => {
  if (typeof window === "undefined") {
    return; // Server-side rendering
  }

  try {
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.error("Error removing user data from localStorage:", error);
  }
};

/**
 * Check if user is authenticated (has valid token)
 */
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return Boolean(token && token.trim().length > 0);
};

/**
 * Clear all auth data (useful for logout)
 */
export const clearAuthData = (): void => {
  removeAuthToken();
  removeUserData();
  // Add any other cleanup logic here if needed
};
