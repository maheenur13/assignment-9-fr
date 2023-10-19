import { IMeta, IService } from "@/interfaces/common";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SERVICE_URL = "/services";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllService: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SERVICE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: { data: IService[]; meta: IMeta }) => {
        return {
          services: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.services],
    }),
    getSingleService: build.query({
      query: (id?: string) => {
        return {
          url: `${SERVICE_URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: IService) => {
        return {
          service: response,
        };
      },
      providesTags: [tagTypes.services],
    }),
    addService: build.mutation({
      query: (data) => ({
        url: SERVICE_URL,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.services],
    }),
    updateService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.services],
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.services],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllServiceQuery,
  useGetSingleServiceQuery,
  useDeleteServiceMutation,
  useAddServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
