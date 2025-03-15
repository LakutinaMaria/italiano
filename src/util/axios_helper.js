import axios from "axios";

axios.defaults.baseURL = "http://localhost:8088/api/v1";
axios.defaults.headers.post["Content-type"] = "application/json";

export const getAuthToken = () => {
  return window.localStorage.getItem("access_token");
};

export const setAuthToken = (token) => {
  window.localStorage.setItem("access_token", token);
};

export const setRefreshToken = (token) => {
  window.localStorage.setItem("refresh_token", token);
};

export const request = (method, url, data) => {
  let headers = {};
  if (getAuthToken !== null && getAuthToken !== "null") {
    headers = { Authorization: `Bearer ${getAuthToken()}` };
  }
  return axios({
    method: method,
    url: url,
    data: data,
    headers: headers,
  }).catch((error) => {
    console.error("Axios Request Error:", error);
    throw error;
  });
};
