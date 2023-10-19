import { message } from "antd";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
import { ILoginResponse, IUser } from "@/interfaces/common";

const USER_URL = "/customer";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: (id:string) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags:[tagTypes.user],
      
      
    }),
  }),
  overrideExisting: true,
});

export const { useGetSingleUserQuery } = userApi;
