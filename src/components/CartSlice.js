import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    count: null,
  },

  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    increaseCount: (state, action) => {
      state.count = state.count + 1;
    },
    decreaseCount: (state, action) => {
      state.count = state.count - 1;
    },

    clearCart: (state) => {
      return {
        items: [],
      };
    },
  },
});

export default CartSlice.reducer;
export const { addItem, increaseCount, decreaseCount, clearCart } =
  CartSlice.actions;
