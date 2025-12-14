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
        // Toggle subservice - add if not exists, remove if exists
        // Ensures all subservices are from the same service
        toggleSubservice: (state, action) => {
            const subservice = action.payload;
            
            // If no subservices selected, add this one
            if (!state.selectedSubservices || state.selectedSubservices.length === 0) {
                state.selectedSubservices = [subservice];
                updateBookingInLocalStorage({
                    selectedSubservices: [subservice]
                });
                return;
            }

            // Check if all existing subservices are from the same service as the new one
            const firstSubserviceService = state.selectedSubservices[0].service?._id || state.selectedSubservices[0].service;
            const newSubserviceService = subservice.service?._id || subservice.service;
            
            // If trying to add subservice from different service, replace all
            if (firstSubserviceService !== newSubserviceService) {
                state.selectedSubservices = [subservice];
                updateBookingInLocalStorage({
                    selectedSubservices: [subservice]
                });
                return;
            }

            // Check if subservice already exists
            const existingIndex = state.selectedSubservices.findIndex(
                sub => sub._id === subservice._id
            );

            if (existingIndex >= 0) {
                // Remove if exists
                state.selectedSubservices = state.selectedSubservices.filter(
                    sub => sub._id !== subservice._id
                );
            } else {
                // Add if doesn't exist
                state.selectedSubservices = [...state.selectedSubservices, subservice];
            }

            updateBookingInLocalStorage({
                selectedSubservices: state.selectedSubservices
            });
        },

        // Keep old action for backward compatibility, but convert to array
        setSelectedSubservice: (state, action) => {
            state.selectedSubservices = action.payload ? [action.payload] : [];
            updateBookingInLocalStorage({
                selectedSubservices: state.selectedSubservices
            });
        },

        setProfessional: (state, action) => {
            state.professional = action.payload;

            updateBookingInLocalStorage({
                professional: action.payload
            });
        },

        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;

            updateBookingInLocalStorage({
                selectedDate: action.payload
            });
        },

        setSelectedTime: (state, action) => {
            state.selectedTime = action.payload;

            updateBookingInLocalStorage({
                selectedTime: action.payload
            });
        },

        clearSelectedSubservices: (state) => {
            state.selectedSubservices = [];
            updateBookingInLocalStorage({
                selectedSubservices: []
            });
        },

        clearBooking: (state) => {
            state.selectedSubservices = [];
            state.professional = null;
            state.selectedDate = null;
            state.selectedTime = null;

            clearBookingFromLocalStorage();
        }
    }
});

export const { setSelectedSubservice, toggleSubservice, clearSelectedSubservices, setProfessional, setSelectedDate, setSelectedTime, clearBooking } = BookingDataSlice.actions;

export const bookingDataReducer = BookingDataSlice.reducer;
