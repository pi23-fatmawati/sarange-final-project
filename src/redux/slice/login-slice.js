import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
    rememberMe: false,
    error: null,
    loading: false,
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    startLoading(state) {
      state.loading = true;
    },
    finishLoading(state) {
      state.loading = false;
    },
    resetLoginForm(state) {
      state.email = "";
      state.password = "";
      state.rememberMe = false;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setRememberMe,
  setError,
  clearError,
  startLoading,
  finishLoading,
  resetLoginForm,
} = loginSlice.actions;

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await axios.post(
      "https://final-sarange-eff62c954ab5.herokuapp.com/login",
      userData
    );

    const data = response.data;
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 12);
    Cookies.set("token", data.token, { expires: expirationTime });
    dispatch(resetLoginForm());
    return response;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 401
    ) {
      dispatch(setError("Email atau password salah"));
    } else {
      dispatch(setError("Error saat mencoba masuk"));
    }
    console.log(error);
  } finally {
    dispatch(finishLoading());
  }
};

export default loginSlice.reducer;