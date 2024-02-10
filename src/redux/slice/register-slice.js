import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        user_name: '',
        email: '',
        password: '',
        confirm_password: '',
        agreement: false,
        error: null
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
        resetForm(state) {
            state.user_name = '',
            state.email = '',
            state.password = '',
            state.confirm_password = '',
            state.agreement = false,
            state.error = null
        },
    },
});

export const { setName, setEmail, setPassword, setConfirmPassword, setAgreement, setError, resetForm } = registerSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post("https://final-sarange-eff62c954ab5.herokuapp.com/register", userData);
        const data = response.data;

        if(response.status !== 201) {
            throw new Error(data.error || 'gagal mendaftar');
        }

        Cookies.set("token", data.token, { expires: 7 })

        dispatch(resetForm())
    } catch(error) {
        console.error("Error registering", error)
        dispatch(setError(error.message || "Gagal mendaftar"));
    }
}

export default registerSlice.reducer