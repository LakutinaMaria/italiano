import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import UserService from "./userServices.tsx";

const HttpMethods = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
} as const;

type HttpMethodsType = typeof HttpMethods[keyof typeof HttpMethods];

const _axios = axios.create();

const configure = (): void => {
  getAxiosClient().interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      if (UserService.isLoggedIn()) {
        const successCb = () => {
          config.headers.Authorization = `Bearer ${UserService.getToken()}`;
          return config; // Explicitly return the modified config
        };

        // Handle the updateToken promise
        return UserService.updateToken(successCb).then((result) => {
          // Use a type guard to check if result is a config object
          if (isConfigObject(result)) {
            return result;
          }
          return successCb(); // Fallback to modifying the original config
        });
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  getAxiosClient().interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const status = error.response ? error.response.status : null;
      if (status === 401) {
        UserService.clearToken();
        return UserService.updateToken(() =>
          getAxiosClient().request(error.config as InternalAxiosRequestConfig<any>)
        );
      }
      if (status === 403) {
        // Handle 403 error if needed
      }
      return Promise.reject(error);
    }
  );
};

const getAxiosClient = () => _axios;

// Type guard to check if the result is an InternalAxiosRequestConfig
function isConfigObject(result: void | InternalAxiosRequestConfig<any>): result is InternalAxiosRequestConfig<any> {
  return result !== undefined && 'headers' in (result as any);
}

const HTTPService = {
  configure,
  getAxiosClient,
  HttpMethods,
};

export default HTTPService;