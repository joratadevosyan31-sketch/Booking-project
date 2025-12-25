import { createSlice } from "@reduxjs/toolkit";
import { fetchDeleteBooking, fetchGetBookings } from "./BookingsDataApi";

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
                state.bookingsData = payload.bookings
            })
            .addCase(fetchGetBookings.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = payload
            })

            // .addCase(fetchPatchBooking.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(fetchPatchBooking.fulfilled, (state, { payload }) => {
            //     state.isLoading = false
            //     // state.bookingsData = payload.bookings
            // })
            // .addCase(fetchPatchBooking.rejected, (state, { payload }) => {
            //     state.isLoading = false
            //     state.isError = payload
            // })

            .addCase(fetchDeleteBooking.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchDeleteBooking.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.bookingsData = payload.bookings
            })
            .addCase(fetchDeleteBooking.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = payload
            })
    }
})

export const bookingsDataReducer = bookingsDataSlice.reducer