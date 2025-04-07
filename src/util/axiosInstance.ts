import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "./constants.ts";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,  // Fixed typo: changed `timeout0` to `timeout`
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      // Fixed typo: changed `Authtorization` to `Authorization`
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
