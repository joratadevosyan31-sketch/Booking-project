import { createSlice } from "@reduxjs/toolkit";
import { fetchGetSalonData, fetchPatchSalonData } from "./SalonApi";

const SalonDataSlice = createSlice({
    name: "salonData",
    initialState: {
        isLoading: false,
        salonData: [],
        isError: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetSalonData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchGetSalonData.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.salonData = payload.salon
            })
            .addCase(fetchGetSalonData.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = payload
            })


            .addCase(fetchPatchSalonData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchPatchSalonData.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.salonData = payload.salon
            })
            .addCase(fetchPatchSalonData.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = payload
            })
    }
})

export const salonDataReducer = SalonDataSlice.reducer