import { AxiosError, AxiosRequestConfig } from "axios";
import AxiosConfig from "../config/axios";

//* Create HTTP Client with Axios
const HttpClient = async (
  url: string,
  data = {},
  method: "get" | "post" | "put" | "delete" | "patch" = "get",
  headers = {},
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
  };

  if (method === "get") {
    config.params = data;
  } else {
    config.data = data;
  }

  try {
    return await AxiosConfig(config);
  } catch (e) {
    const error = e as AxiosError;

    if (error.response?.status === 401) {
      localStorage.clear();
      return Promise.reject(error.response);
    } else if (error.response?.status === 403) {
      return Promise.reject(error.response);
    } else {
      throw error;
    }
  }
};

export default HttpClient;
