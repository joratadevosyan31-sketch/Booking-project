import js from "@eslint/js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadBookingFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('bookingCard');
        if (!serializedState) {
            return {
                subServices: [],
                employee: null,
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading from localStorage:', err);
        return {
            subServices: [],
            employee: null,
            date: null,
            startTime: null,
        };
    }
};


export const saveBookingToLocalStorage = (state) => {
    try {
        localStorage.setItem('bookingCard', JSON.stringify(state));
    } catch (err) {
        console.error('Error saving to localStorage:', err);
    }
};

export const clearBookingFromLocalStorage = () => {
    try {
        localStorage.removeItem('bookingCard');
    } catch (err) {
        console.error('Error clearing localStorage:', err);
    }
};

export const updateBookingInLocalStorage = (newData) => {
    try {
        const oldData = loadBookingFromLocalStorage();

        const updatedData = {
            ...oldData,
            ...newData,
        };

        localStorage.setItem('bookingCard', JSON.stringify(updatedData));
    } catch (err) {
        console.error("Error updating booking in localStorage:", err);
    }
};



export const fetchCreateBooking = createAsyncThunk("bookingCardData/fetchCreateBooking", async ({ subServices, employee, date, startTime }) => {
    const token = localStorage.getItem("token")
    try {
        const responce = await axios.post("http://localhost:4000/bookings/reservation",
            {
                subServices,
                employee,
                date,
                startTime
            },
            {
                headers: {
                    authorization: `Bearer ${token}`
                },
            })

        return responce.data

    } catch (error) {

    }
})