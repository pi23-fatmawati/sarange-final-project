import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    getUserSuccess(state, action) {
      state.data = action.payload.data.user;
      state.isLoading = false;
    },
  },
});

export const { getUserSuccess } = userSlice.actions;

export const getUser = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "https://final-sarange-eff62c954ab5.herokuapp.com/profile",
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      if (response.data && response.data.user) {
        dispatch(getUserSuccess({ data: { user: response.data.user } }));
      } else {
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      console.error("Get user failed:", error);
    }
  };
};

const userBasicInfoSlice = createSlice({
  name: "user_basic_info",
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    getUserBasicInfoSuccess(state, action) {
      state.data = action.payload.data.user;
      state.isLoading = false;
    },
  },
});

export const { getUserBasicInfoSuccess } = userBasicInfoSlice.actions;

export const getUserBasicInfo = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const response = await axios.get(
          "https://final-sarange-eff62c954ab5.herokuapp.com/homepage",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        dispatch(getUserBasicInfoSuccess({ data: response.data }));
      }
    } catch (error) {
      console.error("Gagal mendapatkan data user:", error);
    }
  };
};

export default {
  user: userSlice.reducer,
  user_basic_info: userBasicInfoSlice.reducer,
};