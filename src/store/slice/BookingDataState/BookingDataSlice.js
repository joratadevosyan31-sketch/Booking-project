import { createSlice } from "@reduxjs/toolkit";
import {
    loadBookingFromLocalStorage,
    updateBookingInLocalStorage,
    clearBookingFromLocalStorage
} from "./BookingApi";

const BookingDataSlice = createSlice({
    name: "bookingData",
    initialState: loadBookingFromLocalStorage(),

    reducers: {
        setSelectedSubservice: (state, action) => {
            state.selectedSubservice = action.payload;

            updateBookingInLocalStorage({
                selectedSubservice: action.payload
            });
        },

        setProfessional: (state, action) => {
            state.professional = action.payload;

            updateBookingInLocalStorage({
                professional: action.payload
            });
        },

        clearBooking: (state) => {
            state.selectedSubservice = null;
            state.professional = null;

            clearBookingFromLocalStorage();
        }
    }
});

export const { setSelectedSubservice, setProfessional, clearBooking } = BookingDataSlice.actions;

export const bookingDataReducer = BookingDataSlice.reducer;
