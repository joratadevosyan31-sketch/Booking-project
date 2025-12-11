import { createSlice } from "@reduxjs/toolkit";
import { fetchGetServicesData } from "./ServicesApi";

const ServicesDataSlice = createSlice({
    name: "servicesData",
    initialState: {
        isLoading: false,
        servicesData: [],
        isError: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetServicesData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchGetServicesData.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.servicesData = payload.services
            })
            .addCase(fetchGetServicesData.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = payload
            })
    }
})

export const servicesDateReducer = ServicesDataSlice.reducer