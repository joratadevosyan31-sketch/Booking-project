
import { createSlice } from "@reduxjs/toolkit";
import { fetchInvalidateLogOut, fetchVerifyUser } from "./AuthDataApi.js";


const AuthDataSlice = createSlice({
    name: "authData",
    initialState: {

        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        token: localStorage.getItem("token") || null,
        isAuthenticated: !!localStorage.getItem("token"),
        isLoading: false,
        isError: null,

        // user: JSON.parse(localStorage.getItem("user")),
        // firebaseUser: null,
        // token: JSON.parse(localStorage.getItem("token")),
        // isAuthenticated: !!localStorage.getItem("token"),
        // phoneNumber: "",
        // isLoading: false,
        // isError: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVerifyUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchVerifyUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.token = payload.token
                state.user = payload.user
                state.isAuthenticated = true
                // state.phoneNumber = payload.user.phone
            })
            .addCase(fetchVerifyUser.rejected, (state, { payload }) => {
                state.isError = payload
            })

            .addCase(fetchInvalidateLogOut.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchInvalidateLogOut.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.phoneNumber = "";
            })
            .addCase(fetchInvalidateLogOut.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = payload;
            });
    }

})

export const authDataReducer = AuthDataSlice.reducer