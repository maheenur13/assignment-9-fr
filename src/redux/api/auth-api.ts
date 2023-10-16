import { message } from "antd";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
import { ILoginResponse } from "@/interfaces/common";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userRegister: build.mutation({
      query: (registerData) => ({
        url: `/users/create-customer`,
        method: "POST",
        data: registerData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
  overrideExisting: true,
});

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;