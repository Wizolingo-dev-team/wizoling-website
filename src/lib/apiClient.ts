import type { AxiosRequestConfig } from "axios";
import axiosInstance from "@src/lib/axiosInstance";
import handleApiError from "@src/utils/handleApiError";

export const apiClient = {
  async get<T>(
    url: string,
    defaultErrorMessage: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await axiosInstance.get<T>(url, config);
      return data;
    } catch (err) {
      handleApiError(err, defaultErrorMessage);
    }
  },

  async post<T, B = unknown>(
    url: string,
    body: B,
    defaultErrorMessage: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const isFormData =
        typeof FormData !== "undefined" && body instanceof FormData;
      const { data } = await axiosInstance.post<T>(url, body, {
        ...(config ?? {}),
        headers: {
          ...(config?.headers ?? {}),
          ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
        },
      });
      return data;
    } catch (err) {
      handleApiError(err, defaultErrorMessage);
    }
  },

  async put<T, B = unknown>(
    url: string,
    body: B,
    defaultErrorMessage: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const isFormData =
        typeof FormData !== "undefined" && body instanceof FormData;
      const { data } = await axiosInstance.put<T>(url, body, {
        ...(config ?? {}),
        headers: {
          ...(config?.headers ?? {}),
          ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
        },
      });
      return data;
    } catch (err) {
      handleApiError(err, defaultErrorMessage);
    }
  },

  async patch<T, B = unknown>(
    url: string,
    body: B,
    defaultErrorMessage: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const isFormData =
        typeof FormData !== "undefined" && body instanceof FormData;
      const { data } = await axiosInstance.patch<T>(url, body, {
        ...(config ?? {}),
        headers: {
          ...(config?.headers ?? {}),
          ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
        },
      });
      return data;
    } catch (err) {
      handleApiError(err, defaultErrorMessage);
    }
  },

  async delete<T>(
    url: string,
    defaultErrorMessage: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await axiosInstance.delete<T>(url, config);
      return data;
    } catch (err) {
      handleApiError(err, defaultErrorMessage);
    }
  },
};

