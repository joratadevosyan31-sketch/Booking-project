import { createSlice } from "@reduxjs/toolkit";
import { fetchGetBookings } from "./BookingsDataApi";

const bookingsDataSlice = createSlice({
    name: "bookingsData",
    initialState: {
        isLoading: false,
        bookingsData: [],
        isError: false,
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchGetBookings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchGetBookings.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.customerData = payload.bookings
            })
            .addCase(fetchGetBookings.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = payload
            })
    }
})

export const bookingsDataReducer = bookingsDataSlice.reducer