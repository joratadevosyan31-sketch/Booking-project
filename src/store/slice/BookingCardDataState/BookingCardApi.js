import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

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

export const clearBookingDateTimeFromLocalStorage = () => {
    try {
        const bookingData = JSON.parse(localStorage.getItem("bookingCard")) || {};
        delete bookingData.date;
        delete bookingData.startTime;
        localStorage.setItem("bookingCard", JSON.stringify(bookingData));
    }
    catch (err) {
        console.error("Error clearing booking date and time from localStorage:", err);
    }
}


export const fetchCreateBooking = createAsyncThunk("booking/create", async ({ service, subServices, employee, date, startTime }) => {
    const token = localStorage.getItem("token")

    try {
        const responce = await instance.post("/bookings/reservation",
            {
                service: service,
                subServices,
                employee,
                date,
                startTime,
            },
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        );

        console.log(responce.data);

        return responce.data;
    } catch (error) {
        console.log("fetchCreateBookingerror:", error);
        throw error
    }
}
);
