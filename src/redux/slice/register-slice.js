import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
    agreement: false,
    error: null,
    loading: false,
  },
  reducers: {
    setName(state, action) {
      state.user_name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setConfirmPassword(state, action) {
      state.confirm_password = action.payload;
    },
    setAgreement(state, action) {
      state.agreement = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    startLoading(state) {
      state.loading = true;
    },
    finishLoading(state) {
      state.loading = false;
    },
    resetForm(state) {
      (state.user_name = ""),
        (state.email = ""),
        (state.password = ""),
        (state.confirm_password = ""),
        (state.agreement = false),
        (state.error = null);
    },
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setAgreement,
  setError,
  startLoading,
  finishLoading,
  resetForm,
} = registerSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await axios.post(
      "https://final-sarange-eff62c954ab5.herokuapp.com/register",
      userData
    );
    const data = response.data;
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 12);
    Cookies.set("token", data.token, { expires: expirationTime });
    dispatch(resetForm());
    return response;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      dispatch(setError("Email sudah terdafar"));
    } else {
      dispatch(setError("Error saat mencoba daftar"));
    }
    console.log(error);
  } finally {
    dispatch(finishLoading());
  }
};

export default registerSlice.reducer;