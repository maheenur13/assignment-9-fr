import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBooking: build.mutation({
      query: (data) => ({
        url: BOOKING_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.bookingType],
    }),
  }),
  overrideExisting: true,
});

export const { useAddBookingMutation } = bookingApi;
