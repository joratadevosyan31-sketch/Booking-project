import { createSlice } from "@reduxjs/toolkit";
import {
    loadBookingFromLocalStorage,
    updateBookingInLocalStorage,
    clearBookingFromLocalStorage,
    fetchCreateBooking
} from "./BookingCardApi";

const BookingCardDataSlice = createSlice({
    name: "bookingCardData",
    initialState: {
        ...loadBookingFromLocalStorage(),
        success: false
    },

    reducers: {

        toggleSubservice: (state, action) => {
            const subservice = action.payload;


            if (!state.subServices || state.subServices.length === 0) {
                state.subServices = [subservice];
                updateBookingInLocalStorage({
                    subServices: [subservice]
                });
                return;
            }

            const firstSubserviceService = state.subServices[0].service?._id || state.subServices[0].service;
            const newSubserviceService = subservice.service?._id || subservice.service;


            if (firstSubserviceService !== newSubserviceService) {
                state.subServices = [subservice];
                updateBookingInLocalStorage({
                    subServices: [subservice]
                });
                return;
            }

            const existingIndex = state.subServices.findIndex(
                sub => sub._id === subservice._id
            );

            if (existingIndex >= 0) {
                state.subServices = state.subServices.filter(
                    sub => sub._id !== subservice._id
                );
            } else {
                state.subServices = [...state.subServices, subservice];
            }

            updateBookingInLocalStorage({
                subServices: state.subServices
            });
        },

        setSelectedSubservice: (state, action) => {
            state.subServices = action.payload ? [action.payload] : [];
            updateBookingInLocalStorage({
                subServices: state.subServices
            });
        },

        setProfessional: (state, action) => {
            state.employee = action.payload;

            updateBookingInLocalStorage({
                employee: action.payload
            });
        },

        setSelectedDate: (state, action) => {
            state.date = action.payload;

            updateBookingInLocalStorage({
                date: action.payload
            });
        },

        setSelectedTime: (state, action) => {
            state.startTime = action.payload;

            updateBookingInLocalStorage({
                startTime: action.payload
            });
        },

        clearSelectedSubservices: (state) => {
            state.subServices = [];
            updateBookingInLocalStorage({
                subServices: []
            });
        },

        clearBooking: (state) => {
            state.subServices = [];
            state.employee = null;
            state.date = null;
            state.startTime = null;

            clearBookingFromLocalStorage();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateBooking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCreateBooking.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.success = payload
            })
            .addCase(fetchCreateBooking.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = payload;
            });
    }
});

export const { setSelectedSubservice, toggleSubservice, clearSelectedSubservices, setProfessional, setSelectedDate, setSelectedTime, clearBooking } = BookingCardDataSlice.actions;

export const bookingCardReducer = BookingCardDataSlice.reducer;
