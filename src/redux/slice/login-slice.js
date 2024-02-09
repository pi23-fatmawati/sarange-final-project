import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        email: '',
        password: '',
        rememberMe: false,
        error: null,
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
        },
        clearError(state) {
            state.error = null;
        },
        resetLoginForm(state) {
            state.email = '';
            state.password = '';
            state.rememberMe = false;
            state.error = null;
        },
    },
});

export const { setEmail, setPassword, setRememberMe, setError, clearError, resetLoginForm } = loginSlice.actions;

export const loginUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post("https://final-sarange-eff62c954ab5.herokuapp.com/login", userData);
        const data = response.data;

        if(response.status !== 200) {
            throw new Error(data.error || 'gagal login')
        }

        Cookies.set("token", data.token, { expires: 7 })

        dispatch(resetLoginForm())
    } catch(error) {
        console.error('Error login', error)
        dispatch(setError(error.message || 'gagal login'))
    }
}

export default loginSlice.reducer;