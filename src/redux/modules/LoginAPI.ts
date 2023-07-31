import {
  BaseQueryFn,
  FetchBaseQueryMeta,
  createApi,
} from "@reduxjs/toolkit/query/react";
import { AxiosArgs, ResponseData } from "../../types/BasicRequestType";
import {
  Auth,
  LoginData,
  NicknameDataType,
  SignInErrorData,
  SingInData,
  UsernameDataType,
} from "../../types/LoginType";
import axios, { AxiosError, AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://1.244.223.183",
});

const axiosBaseQuery =
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
      let data = err.response?.data as ResponseData<SignInErrorData>;
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

export const Loginapi = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: axiosBaseQuery(instance),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    postLogin: builder.mutation<ResponseData<LoginData>, Auth>({
      // The URL for the request is '/fakeApi/posts'
      query: (payload) => ({
        url: "/api/auth/login",
        method: "POST",
        data: payload,
      }),
      transformResponse: (response: ResponseData<any>, meta, arg) => {
        console.log("response", response);
        console.log("meta", meta);
        console.log("arg", arg);
        return response;
      },
    }),
    SignIn: builder.mutation<ResponseData<any>, SingInData>({
      // The URL for the request is '/fakeApi/posts'
      query: (payload) => ({
        url: "/api/auth/signin",
        method: "POST",
        data: payload,
      }),
      // transformResponse: (response: ResponseData<any>, meta, arg) => {
      //   console.log("response", response);
      //   console.log("meta", meta);
      //   console.log("arg", arg);
      //   return response;
      // },
      // transformErrorResponse: (response, meta, arg) => {
      //   console.log("response", response);
      //   console.log("meta", meta);
      //   console.log("arg", arg);
      //   return response as ResponseData<any>;
      // },
    }),
    getCheckNickname: builder.query<ResponseData<any>, NicknameDataType>({
      // The URL for the request is '/fakeApi/posts'
      query: (payload) => ({
        url: "/api/auth/nickname",
        method: "get",
        params: payload,
      }),
      // transformResponse: (response, meta, arg) => {
      //   console.log("response", response);
      //   console.log("meta", meta);
      //   console.log("arg", arg);
      //   return response as ResponseData<any>;
      // },
      transformErrorResponse: (
        response: { data: ResponseData<any> },
        meta,
        arg
      ) => {
        console.log("response", response);
        console.log("meta", meta);
        console.log("arg", arg);
        return response.data;
      },
    }),
    getCheckUsername: builder.query<ResponseData<any>, UsernameDataType>({
      // The URL for the request is '/fakeApi/posts'
      query: (payload) => ({
        url: "/api/auth/username",
        method: "get",
        params: payload,
      }),
      transformResponse: (response, meta, arg) => {
        console.log("response", response);
        console.log("meta", meta);
        console.log("arg", arg);
        return response as ResponseData<any>;
      },
      // transformErrorResponse: (response, meta, arg) => {
      //   console.log("response", response);
      //   console.log("meta", meta);
      //   console.log("arg", arg);
      //   return response as ResponseData<any>;
      // },
    }),
  }),
});

export const {
  usePostLoginMutation,
  useSignInMutation,
  useGetCheckNicknameQuery,
  useGetCheckUsernameQuery,
} = Loginapi;
