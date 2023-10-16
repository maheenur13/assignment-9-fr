import { CartItemType } from "@/interfaces/common";
import { store } from "../store";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotal,
  removeFromCart,
  setCartOpen,
} from "./cart.slice";

export const cartOpenHandler = (value: boolean) => {
  store.dispatch(setCartOpen(value));
};
export const handleAddToCart = (product: CartItemType) => {
  store.dispatch(addToCart(product));
};
export const handleRemoveFromCart = (product: CartItemType) => {
  store.dispatch(removeFromCart(product));
};
export const handleReduceQuantity = (product: CartItemType) => {
  store.dispatch(decreaseCart(product));
};
export const handleClearCart = () => {
  store.dispatch(clearCart());
};
export const handleGetTotal = () => {
  store.dispatch(getTotal());
};
