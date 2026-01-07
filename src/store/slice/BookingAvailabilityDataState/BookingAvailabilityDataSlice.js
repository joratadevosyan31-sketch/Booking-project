import { createSlice } from "@reduxjs/toolkit";
import { fetchGetBookingAvailability } from "./BookingAvailabilityDataApi";

const AvailableSlotsDataSlice = createSlice({
    name: "bookingAvailabilities",
    initialState: {
        isLoading: false,
        isError: null,
        availableEmployees: [],
        availableSubServices: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetBookingAvailability.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGetBookingAvailability.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.availableEmployees = payload.availableEmployees;
                state.availableSubServices = payload.availableSubServices;
            })
            .addCase(fetchGetBookingAvailability.rejected, (state, { payload }) => {
                state.isError = payload;
                state.isLoading = false;
            });
    }
});

export const bookingAvailabilitiesDataReducer = AvailableSlotsDataSlice.reducer;
