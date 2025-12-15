import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetBookings = createAsyncThunk("customerData/fetchGetBookings", async () => {
    try {
        const response = await instance.get("/bookings")
        const result = response.data
        console.log(response)

        return result
    } catch (error) {
        console.error("fetchGetBookings error:", error);
        throw error;
    }
})