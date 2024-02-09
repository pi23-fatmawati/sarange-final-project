import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
    isLoading: false,
  },
  reducers: {
    getProductSuccess(state, action) {
      state.product = action.payload.data;
      state.isLoading = false;
    },
    getProductDetailFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getProductSuccess, getProductDetailFailure } =
  productSlice.actions;

export const getProduct = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://final-sarange-eff62c954ab5.herokuapp.com/products",
        {
          headers: { authorization: `${token}` },
        }
      );
      dispatch(getProductSuccess({ data: response.data }));
    } catch (error) {
      console.error("Get products failed:", error);
    }
  };
};

export default productSlice.reducer;
