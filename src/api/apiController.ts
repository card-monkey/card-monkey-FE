import axios from "axios";
import { getCookie, removeCookie } from "../utils/cookie";

const { VITE_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  function (config) {
    const token = getCookie();
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    console.log(window.location.href);
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      removeCookie();
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default instance;
