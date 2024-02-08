import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        isLoading: false,
    },
    reducers: {
        getUserSuccess(state, action) {
            state.user = action.payload.data;
            state.isLoading = false;
        },
    },
});

export const { getUserSuccess } = userSlice.actions;

export const getUser = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://final-sarange-eff62c954ab5.herokuapp.com/profile');
            dispatch(getUser({ data: response.data.user }));
        } catch (error) {
            console.error('Get user failed:', error)
        }
    }
}

export default userSlice.reducer;