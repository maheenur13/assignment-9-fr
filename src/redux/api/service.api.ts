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
    }),
  }),
});

export const { useGetAllServiceQuery, useGetSingleServiceQuery } = serviceApi;
