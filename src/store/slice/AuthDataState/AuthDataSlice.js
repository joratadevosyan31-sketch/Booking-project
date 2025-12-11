import { createSlice } from "@reduxjs/toolkit";

const AuthDataSlice = createSlice({
    name: "authData",
    initialState: {
        isLoading: false,
        user: [],
        authToken: null,
        isError: false,
    },
    reducers: {

    },

    // extraReducers: (builder) => {
    //     builder
    //     .addCase(fetchGetEmployeesData.pending, (state) => {
    //         state.isLoading = true
    //     })
    //     .addCase(fetchGetEmployeesData.fulfilled, (state, { payload }) => {
    //         state.isLoading = false
    //         state.employeesData = payload.employees
    //     })
    //     .addCase(fetchGetEmployeesData.rejected, (state, { payload }) => {
    //         state.isLoading = false
    //         state.isError = payload
    //     })
    // }

})

export const authDataReducer = AuthDataSlice.reducer