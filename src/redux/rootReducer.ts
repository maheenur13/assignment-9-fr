import { baseApi } from "./api/baseApi";
import cart from "./cart/cart.slice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  cart,
};
