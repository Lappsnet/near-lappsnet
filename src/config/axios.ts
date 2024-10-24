import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  AxiosResponse,
} from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_URL as string,
};

const AxiosConfig: AxiosInstance = axios.create(config);

AxiosConfig.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

AxiosConfig.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosError | undefined> => {
    if (error.code === "ERR_NETWORK") {
      return Promise.reject(error);
    }

    // Uncomment and customize this block as needed
    // const status = error.response?.status;
    // if (
    //   status !== 401 ||
    //   (status === 401 && window.location.pathname === "/")
    // ) {
    //   return Promise.reject(error);
    // }

    return Promise.reject(error);
  },
);

export default AxiosConfig;
