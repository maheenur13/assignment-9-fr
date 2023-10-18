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
          category: response,
        };
      },
      providesTags: [tagTypes.serviceCategory],
    }),
    deleteCategory: build.mutation({
      query: (id?: string) => {
        return {
          url: `${CATEGORY_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.serviceCategory],
    }),
    createCategory: build.mutation({
      query: (data) => {
        return {
          url: `${CATEGORY_URL}`,
          method: "POST",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.serviceCategory],
    }),
    updateCategory: build.mutation({
      query: (data) => {
        return {
          url: `${CATEGORY_URL}/${data.id}`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.serviceCategory],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
