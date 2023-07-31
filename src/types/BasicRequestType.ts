import { AxiosRequestConfig } from "axios";

export type ResponseData<T> = {
  msg: string;
  data?: T;
};

export type AxiosArgs = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};
