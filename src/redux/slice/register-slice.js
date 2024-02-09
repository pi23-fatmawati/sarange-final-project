import { createSlice } from "@reduxjs/toolkit";

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
export default registerSlice.reducer