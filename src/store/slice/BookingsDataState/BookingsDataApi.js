import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetBookings = createAsyncThunk("bookingsData/fetchGetBookings", async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await instance.get("/bookings", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("fetchGetBookings error:", error);
        throw error;
    }
}
);


export const fetchDeleteBooking = ("bookingsData/fetchDeleteBooking", async ({ bookingId }) => {
    try {
        const responce = await instance.delete("/bookings", {
            bookingId
        })
        const result = responce.data

        return result
    } catch (error) {
        console.log("fetchDeleteBooking error:", error);
        throw error
    }
})



