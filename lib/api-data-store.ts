/**
 * API Data Store
 * Centralized store for API responses and data management
 */

interface ApiResponse<T = any> {
  message: string;
  data: T;
  type: string;
  success: boolean;
}

interface LoginApiResponse {
  user: {
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
  };
  token: string;
}

class ApiDataStore {
  private static instance: ApiDataStore;
  private loginResponse: ApiResponse<LoginApiResponse> | null = null;

  private constructor() {}

  static getInstance(): ApiDataStore {
    if (!ApiDataStore.instance) {
      ApiDataStore.instance = new ApiDataStore();
    }
    return ApiDataStore.instance;
  }

  // Store login response
  setLoginResponse(response: ApiResponse<LoginApiResponse>): any {
    this.loginResponse = response;
  }

  // Get login response
  getLoginResponse(): ApiResponse<LoginApiResponse> | null {
    return this.loginResponse;
  }

  // Get current user data
  getCurrentUser(): LoginApiResponse["user"] | null {
    return this.loginResponse?.data?.user || null;
  }

  // Get current token
  getCurrentToken(): string | null {
    return this.loginResponse?.data?.token || null;
  }

  // Clear all stored data
  clearData(): void {
    this.loginResponse = null;
  }
}

export const S3_URL = "https://metaboard-pro.s3.ap-south-1.amazonaws.com/";
// Export singleton instance
export const apiDataStore = ApiDataStore.getInstance();

// Export types for use in components
export type { ApiResponse, LoginApiResponse };
