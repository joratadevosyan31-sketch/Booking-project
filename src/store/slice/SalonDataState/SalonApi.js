import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetSalonData = createAsyncThunk("salonData/fetchGetSalonData", async () => {
    try {
        const response = await instance.get("/salon");
        const result = response.data
        // console.log(result);
        return result
    } catch (error) {
        console.error("fetchGetSalonData error:", error);
        throw error;
    }
})


export const fetchPatchSalonData = createAsyncThunk("salonData/fetchPatchSalonData", async () => {
    try {
        const responce = await instance.patch("/salon");
        const result = responce.data

        return result
    } catch (error) {
        console.error("fetchPatchSalonData error:", error);
        throw error
    }
})