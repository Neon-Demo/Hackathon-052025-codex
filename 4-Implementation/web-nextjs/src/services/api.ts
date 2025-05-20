import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

// API response and error types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

class ApiService {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Add request interceptor to attach auth token
    this.client.interceptors.request.use(
      async (config) => {
        const session = await getSession();
        if (session?.user) {
          config.headers.Authorization = `Bearer ${session.user.id}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const apiError: ApiError = {
          message: error.response?.data?.message || "An unexpected error occurred",
          errors: error.response?.data?.errors,
          status: error.response?.status || 500,
        };
        return Promise.reject(apiError);
      }
    );
  }

  // Generic request method
  private async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // GET method
  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: "get",
      url,
      params,
    });
  }

  // POST method
  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: "post",
      url,
      data,
    });
  }

  // PUT method
  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: "put",
      url,
      data,
    });
  }

  // PATCH method
  async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: "patch",
      url,
      data,
    });
  }

  // DELETE method
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: "delete",
      url,
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();