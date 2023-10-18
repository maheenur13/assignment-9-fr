import { IMeta, IService, IVehicle, IVehicleType } from "@/interfaces/common";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const VEHICLE_URL = "/vehicles";
const VEHICLE_TYPE_URL = "/vehicle-types";

export const vehicleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllVehicle: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: VEHICLE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: { data: IVehicle[]; meta: IMeta }) => {
        return {
          vehicles: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.vehicles],
    }),
    getSingleVehicle: build.query({
      query: (id?: string) => {
        return {
          url: `${VEHICLE_URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: IVehicle) => {
        return {
          vehicle: response,
        };
      },
      providesTags: [tagTypes.vehicles],
    }),
    addVehicle: build.mutation({
      query: (data) => ({
        url: VEHICLE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vehicles],
    }),
    updateVehicle: build.mutation({
      query: (data) => ({
        url: `${VEHICLE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.vehicles],
    }),
    deleteVehicle: build.mutation({
      query: (id) => ({
        url: `${VEHICLE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.vehicles],
    }),
    addVehicleType: build.mutation({
      query: (data) => ({
        url: VEHICLE_TYPE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vehicleType],
    }),
    getAllVehicleTypes: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: VEHICLE_TYPE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: { data: IVehicleType[]; meta: IMeta }) => {
        return {
          vehiclesTypes: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.vehicleType],
    }),
    getSingleVehicleType: build.query({
      query: (id?: string) => {
        return {
          url: `${VEHICLE_TYPE_URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: IVehicleType) => {
        return {
          vehicleType: response,
        };
      },
      providesTags: [tagTypes.vehicleType],
    }),
    updateVehicleType: build.mutation({
      query: (data) => ({
        url: `${VEHICLE_TYPE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.vehicleType],
    }),
    deleteVehicleType: build.mutation({
      query: (id) => ({
        url: `${VEHICLE_TYPE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.vehicleType],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllVehicleQuery,
  useGetSingleVehicleQuery,
  useDeleteVehicleMutation,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useAddVehicleTypeMutation,
  useGetAllVehicleTypesQuery,
  useGetSingleVehicleTypeQuery,
  useUpdateVehicleTypeMutation,
  useDeleteVehicleTypeMutation,
} = vehicleApi;
