import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transaction: [],
        isLoading: false,
    },
    reducers: {
        getTransactionSuccess(state, action) {
            state.transaction = action.payload.data;
            state.isLoading = false;
        },
    },
});

export const { getTransactionSuccess } = transactionSlice.actions;

export const getTransaction = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('url');
            dispatch(getTransaction({ data: response.data }));
        } catch (error) {
            console.error('Get transaction failed:', error)
        }
    }
}

export default userSlice.reducer;