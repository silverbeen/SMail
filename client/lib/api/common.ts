import axios, { AxiosError, AxiosResponse } from "axios";

export const MAIN_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: MAIN_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config: any) {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("access-token");

    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);
export default instance;
