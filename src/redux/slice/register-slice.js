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
  dispatch(startLoading());
    try {
        const response = await axios.post("https://final-sarange-eff62c954ab5.herokuapp.com/register", userData);
        const data = response.data;

        if(response.status !== 201) {
            throw new Error(data.error || 'gagal mendaftar');
        }

        Cookies.set("token", data.token, { expires: 7 })

        dispatch(resetForm())
    } catch {
        console.error("Error registering", error)
        dispatch(setError(error.message || "Gagal mendaftar"));
    } finally {
    dispatch(finishLoading());
  }
};

export default registerSlice.reducer;