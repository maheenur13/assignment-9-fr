import { IMeta, IServiceCategory } from "@/interfaces/common";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CATEGORY_URL = "/service-category";
type ICategoryArg = {
  query?: Record<string, any>;
  extraUrl?: string | null;
};

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: (arg?: Record<string, any>) => {
        return {
          url: CATEGORY_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: {
        data: IServiceCategory[];
        meta: IMeta;
      }) => {
        return {
          categories: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.serviceCategory],
    }),
    getSingleCategory: build.query({
      query: (id?: string) => {
        return {
          url: `${CATEGORY_URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: IServiceCategory) => {
        return {
          product: response,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllCategoryQuery, useGetSingleCategoryQuery } =
  categoryApi;
