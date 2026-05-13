import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const serverAxiosInstance = axios.create({
  baseURL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor Request untuk menyisipkan Token JWT secara otomatis.
 * Dieksekusi SEBELUM request benar-benar dikirim ke backend eksternal.
 */
serverAxiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Membaca cookie secara dinamis dari konteks request SSR saat ini
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      throw new Error("Unauthorized");
    }

    config.headers.set("Authorization", `Bearer ${token}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Utility `serverApi` digunakan KHUSUS untuk pemanggilan API dari Server Component (SSR) atau Server Actions.
 *
 * Keuntungan:
 * - Kode menjadi sangat DRY (Don't Repeat Yourself).
 * - Tidak perlu lagi memikirkan pembacaan cookie atau injeksi header secara manual di setiap fungsi fetch.
 */
export const serverApi = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    return serverAxiosInstance.get<T>(url, config);
  },
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return serverAxiosInstance.post<T>(url, data, config);
  },
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return serverAxiosInstance.put<T>(url, data, config);
  },
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return serverAxiosInstance.patch<T>(url, data, config);
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    return serverAxiosInstance.delete<T>(url, config);
  },
};
