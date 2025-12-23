import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetSalonData = createAsyncThunk("salonData/fetchGetSalonData", async () => {
    try {
        const response = await instance.get("/salon");
        const result = response.data
        console.log(result);
        return result
    } catch (error) {
        console.error("fetchGetSalonData error:", error);
        throw error;
    }
})


export const fetchPatchSalonData = createAsyncThunk('salonData/fetchPatchSalonData',
    async (updateData, { rejectWithValue }) => {
        const token = localStorage.getItem("token")
        try {
            const response = await instance.patch('/salon', updateData,  {
                headers: { Authorization: `Bearer ${token}` },
            })
            return response.data
        } catch (err) {
            return rejectWithValue(err.response?.data)
        }
    }
)
