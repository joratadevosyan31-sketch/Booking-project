import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetBookingAvailability = createAsyncThunk(
    "bookingAvailabilities/fetchGetBookingAvailability",
    async (params) => {
        try {
            const query = new URLSearchParams(params).toString();
            const response = await instance.get(`availability/booking-availability?${query}`);
            return response.data;
        } catch (error) {
            console.error("fetchGetBookingAvailability error:", error);
            throw error;
        }
    }
);
