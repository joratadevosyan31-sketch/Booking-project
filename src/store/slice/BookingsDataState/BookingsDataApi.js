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

        const result = response.data
        console.log(result);

        return result
    } catch (error) {
        console.error("fetchGetBookings error:", error);
        throw error;
    }
}
);


export const fetchPatchBooking = createAsyncThunk("bookingsData/fetchPatchBooking", async ({ bookingId, data }) => {
    const token = localStorage.getItem("token")
    try {
        const response = await instance.patch("/bookings",
            {
                bookingId,
                ...data
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const result = response.data

        return result
    } catch (error) {
        console.log("fetchPatchBooking error:", error);
        throw error
    }
})

export const fetchDeleteBooking = createAsyncThunk('salonData/fetchDeleteBooking', async (bookingId, { rejectWithValue }) => {
    const token = localStorage.getItem("token")
    console.log(bookingId);

    try {
        const response = await instance.delete(`/bookings/${bookingId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        const result = response.data

        return result
    } catch (err) {
        console.error("fetchDeleteBooking error:", err)
        return rejectWithValue(err.response?.data)
    }
}
)
