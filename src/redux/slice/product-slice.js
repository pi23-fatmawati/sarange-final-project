import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const productSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
    productDetail: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    getProductSuccess(state, action) {
      state.product = action.payload.data;
      state.isLoading = false;
    },
    getProductDetailSuccess(state, action) {
      state.productDetail = action.payload.data;
      state.isLoading = false;
    },
    getProductFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearProductDetail(state) {
      state.productDetail = null;
    },
  },
});

export const {
  getProductSuccess,
  getProductDetailSuccess,
  getProductFailure,
} = productSlice.actions;

export const getProduct = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "https://final-sarange-eff62c954ab5.herokuapp.com/products",
        {
          headers: { authorization: `${token}` },
        }
      );
      dispatch(getProductSuccess({ data: response.data }));
    } catch (error) {
      console.error("Get products failed:", error);
      dispatch(getProductFailure(error.message));
    }
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `https://final-sarange-eff62c954ab5.herokuapp.com/product/${id}`,
        {
          headers: { authorization: `${token}` },
        }
      );
      dispatch(getProductDetailSuccess({ data: response.data }));
    } catch (error) {
      console.error(`Get product by ID (${id}) failed:`, error);
      dispatch(getProductFailure(error.message));
    }
  };
};

export default productSlice.reducer;