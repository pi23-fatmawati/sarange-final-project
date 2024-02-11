import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: !!Cookies.get("token"),
        error: null,
    },
    reducers: {
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
        logout(state) {
            Cookies.remove("token")
            state.isAuthenticated = false;
        },
    },
});

export const { setAuthenticated, setError, clearError, logout } = authSlice.actions;

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(logout())
    } catch(error) {
        console.error("Error logout", error);
        dispatch(setError(error.message || "gagal logout"))
    }
}

export default authSlice.reducer;