import axios from "axios";
import UserService from "./userServices";

const HttpMethods = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
};

const _axios = axios.create();

const configure = () => {
  getAxiosClient().interceptors.request.use((config) => {
    console.log(UserService.getToken());
    if (UserService.isLoggedIn()) {
      console.log("logged in ");
      const successCb = () => {
        console.log(config);
        if (config.headers) {
          config.headers.Authorization = `Bearer ${UserService.getToken()}`;
        }
        return Promise.resolve(config);
      };
      return UserService.updateToken(successCb);
    }
    return config;
  });

  getAxiosClient().interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response ? error.response.status : null;
      if (status === 401) {
        UserService.clearToken();
        return UserService.updateToken(() =>
          getAxiosClient().request(error.config)
        );
      }
      if (status === 403) {
      }
      return Promise.reject(error);
    }
  );
};

const getAxiosClient = () => _axios;

const HTTPService = {
  configure,
  getAxiosClient,
  HttpMethods,
};

export default HTTPService;
