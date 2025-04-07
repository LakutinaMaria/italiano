import axios, { Method, AxiosRequestConfig } from "axios";

axios.defaults.baseURL = "http://localhost:8088/api/v1";
axios.defaults.headers.post["Content-type"] = "application/json";

export const getAuthToken = (): string | null => {
  return window.localStorage.getItem("access_token");
};

export const setAuthToken = (token: string) => {
  window.localStorage.setItem("access_token", token);
};

export const setRefreshToken = (token: string) => {
  window.localStorage.setItem("refresh_token", token);
};

export const request = (
  method: Method,
  url: string,
  data?: any
): Promise<any> => {
  let headers: Record<string, string> = {};

  const token = getAuthToken();
  if (token && token !== "null") {
    headers = { Authorization: `Bearer ${token}` };
  }

  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers,
  };

  return axios(config)
    .catch((error) => {
      console.error("Axios Request Error:", error);
      throw error;
    });
};
