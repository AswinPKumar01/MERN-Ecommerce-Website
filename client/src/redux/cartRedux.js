import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 324950,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const productIdToRemove = action.payload;
      const productToRemoveIndex = state.products.findIndex(
        (product) => product._id === productIdToRemove
      );

      if (productToRemoveIndex !== -1) {
        const removedProduct = state.products[productToRemoveIndex];

        state.quantity -= removedProduct.quantity;
        state.total -= removedProduct.price * removedProduct.quantity;
        state.products.splice(productToRemoveIndex, 1);
      }

      state.quantity = Math.max(state.quantity, 0);
    },
    resetCartTotal: (state) => {
      state.total = 0;
    },
  },
});
export const { addProduct, removeProduct, resetCartTotal } = cartSlice.actions;
export default cartSlice.reducer;
