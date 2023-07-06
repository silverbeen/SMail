import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

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

function createFormData(input: Object | string | any): FormData {
  return Object.keys(input || {}).reduce((formData, key) => {
    const property = input[key];
    formData.append(
      key,
      property instanceof Blob
        ? property
        : typeof property === "object" && property !== null
        ? JSON.stringify(property)
        : `${property}`
    );
    return formData;
  }, new FormData());
}

const http = {
  get: <T, Q = {}>(url: string, query?: Q, config?: AxiosRequestConfig) => {
    return instance.get<T>(url, {...config, params: query}).then((r) => {
      return r.data;
    });
  },

  post: <T, D = {}>(url: string, data?: D, config?: AxiosRequestConfig) => {
    let body;
    body = data;
    if (config?.headers?.["content-type"] === "multipart/form-data") {
      body = createFormData(data!);
    }
    return instance.post<T>(url, body, config).then((r) => r.data);
  },

  put: <T, D = {}>(url: string, data?: D, config?: AxiosRequestConfig) => {
    let body;
    body = data;
    if (config?.headers?.["content-type"] === "multipart/form-data") {
      body = createFormData(data!);
    }
    return instance.put<T>(url, body, config).then((r) => r.data);
  },

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    instance.delete<T>(url, config).then((r) => r.data),
};

export default http;
