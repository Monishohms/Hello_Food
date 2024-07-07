import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    restaurant: null,
  },

  reducers: {
    addItem: (state, action) => {
      const { item, restaurant } = action.payload;
      if (state.restaurant === null) {
        state.restaurant = restaurant;
        state.items.push(item);
      } else if (state.restaurant.id != restaurant.id) {
        state.restaurant = restaurant;
        state.items = [item];
      } else {
        state.items.push(item);
      }
    },

    increaseCount: (state, action) => {
      state.items.map((item) => {
        if (item[0]?.id == action.payload) {
          item[1]++;
        }
      });
    },
    decreaseCount: (state, action) => {
      state.items.map((item, index) => {
        if (item[0]?.id == action.payload) {
          item[1]--;
          if (item[1] == 0) state.items.splice(index, 1);
        }

        if (state.items.length == 0) state.restaurant = null;
      });
    },

    clearCart: () => {
      return {
        items: [],
        restaurant: null,
      };
    },
  },
});

export default CartSlice.reducer;
export const { addItem, increaseCount, decreaseCount, clearCart } =
  CartSlice.actions;
