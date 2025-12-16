import { createSlice } from "@reduxjs/toolkit";
import { fetchVerifyUser } from "./AuthDataApi";

const AuthDataSlice = createSlice({
    name: "authData",
    initialState: {
        user: null,
        firebaseUser: null,
        token: null,
        phoneNumber: "",
        isLoading: false,
        isError: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVerifyUser.pending, (state, { payload }) => {
                state.isLoading = false;
            })
            .addCase(fetchVerifyUser.fulfilled, (state, { payload }) => {
                state.token = payload.token
                state.user = payload.user
                state.phoneNumber = payload.user.phone
            })
            .addCase(fetchVerifyUser.rejected, (state, { payload }) => {
                state.isError = payload
            })
    }

})

export const authDataReducer = AuthDataSlice.reducer