import { BaseQueryFn, FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from "axios";
import { AxiosArgs, ResponseData } from "../../types/BasicRequestType";

export const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig<any>) {
    let accessToken;
    config.headers.Authorization =
      !!(accessToken = localStorage.getItem("Authorization")) && accessToken;
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (config: AxiosResponse<ResponseData<any>, any>) {
    if (config.status === HttpStatusCode.Ok)
      return { ...config, data: config.data };
    else
      return {
        ...config,
        data: config.data.msg,
      };
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

export const axiosBaseQuery =
  (
    instance = axios.create({ baseURL: "" })
  ): BaseQueryFn<AxiosArgs, unknown, unknown, {}, FetchBaseQueryMeta> =>
  async ({ url, method, data, params }) => {
    try {
      console.log(data);
      const result = await instance({
        url,
        method,
        data,
        params,
      });
      console.log("result", result);
      return {
        data: result.data,
        meta: {
          request: result.request,
        },
      };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      console.log(err);
      let data = err.response?.data as ResponseData<any>;
      if (data !== null) {
        return {
          error: {
            msg: data.msg,
            data: !!data.data ? data.data : null,
          },
          meta: {
            request: err.request,
            response: err.response,
          } as FetchBaseQueryMeta,
        };
      }
      console.log("error", err);
      return {
        error: {
          status: err.status,
          data: err.response?.data || err.message,
        },
        meta: {
          request: err.request,
          response: err.response,
        } as FetchBaseQueryMeta,
      };
    }
  };
