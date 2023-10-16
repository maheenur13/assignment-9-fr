import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { CartItemType } from "@/interfaces/common";

const initialState: StateType = {
  cartItems: [],
  isCartOpen: false,
  totalItems: 0,
  grandTotal: 0,
  subTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const currentProduct = { ...action.payload };
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === currentProduct.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        const tempProduct = { ...currentProduct, quantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },
    removeFromCart(state, action: PayloadAction<CartItemType>) {
      const currentProduct = { ...action.payload };
      const updatedCart = state.cartItems.filter(
        (item) => item.id !== currentProduct.id
      );
      state.cartItems = updatedCart;
    },
    decreaseCart(state, action: PayloadAction<CartItemType>) {
      const currentProduct = { ...action.payload };
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === currentProduct.id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const updatedCart = state.cartItems.filter(
          (item) => item.id !== currentProduct.id
        );
        state.cartItems = updatedCart;
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
    getTotal(state) {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.subTotal = Number(total.toFixed(2));
      state.totalItems = quantity;

      state.grandTotal = Number(total.toFixed(2));
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotal,
  setCartOpen,
} = cartSlice.actions;

export const getCartState = (state: AppState) => state.cart;

export default cartSlice.reducer;

type StateType = {
  cartItems: CartItemType[];
  isCartOpen: boolean;

  totalItems: number;
  grandTotal: number;
  subTotal: number;
};
