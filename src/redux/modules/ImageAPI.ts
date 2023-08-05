import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../config/axios";
import axios from "axios";
import { ResponseData } from "../../types/BasicRequestType";

export const instance = axios.create({
  baseURL: "http://1.244.223.183",
});

export const Imageapi = createApi({
  reducerPath: "image",
  baseQuery: axiosBaseQuery(instance),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<ResponseData<Array<string>>, FormData>({
      query: (payload) => ({
        url: "/api/upload/image",
        method: "POST",
        data: payload,
      }),
    }),
    deleteImage: builder.mutation<ResponseData<any>, null>({
      query: () => ({
        url: "/api/upload/image",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUploadImageMutation, useDeleteImageMutation } = Imageapi;
