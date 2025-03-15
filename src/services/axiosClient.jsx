import axios from "axios";

const _axios = axios.create({
  withCredentials: true,
});

export const getAxiosClient = () => _axios;
