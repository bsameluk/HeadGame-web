import axios from "axios";
import humps from "humps";

const BASE_URL = import.meta.env.VITE_API_URL // || 'http://localhost:3000';

export const request = async <TRequest, TResponse = any>(config: {
  method: string;
  url: string;
  data?: TRequest;
  params?: TRequest;
}): Promise<TResponse> => {
  try {
    const sanitizedConfig = {
      ...config,
      params: config.params && typeof config.params === 'object' ? config.params : undefined,
      data: config.data && typeof config.data === 'object' ? config.data : undefined,
      baseURL: BASE_URL,
      withCredentials: false,
      headers: {
        "Content-Type": "application/json"
      },
    };

    const response = await axios(sanitizedConfig);

    return humps.camelizeKeys(response.data) as TResponse;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response?.data?.error || "Error while requesting to API");
  }
};

export const createApiCall = <TRequest, TResponse = void>(
  method: string,
  path: string | ((params: TRequest) => string)
) => {
  return async (data?: TRequest): Promise<TResponse> => {
    const url = typeof path === 'function' ? path(data as TRequest) : path;

    const config = {
      method,
      url,
      ...(method === "GET" || method === "DELETE"
        ? { params: data }
        : { data: data })
    };

    return request<TRequest, TResponse>(config);
  };
};