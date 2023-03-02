import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";

const { VITE_URL, VITE_TOKEN } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  function (config) {
    setCookie(VITE_TOKEN);
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
