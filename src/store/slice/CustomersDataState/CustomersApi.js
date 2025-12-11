import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetCustomer = createAsyncThunk("customerData/fetchGetCustomer", async () => {
    try {
        const response = await instance.get("/customers")
        const result = response.data
        console.log(response)

        return result
    } catch (error) {
        console.error("fetchGetCustomer error:", error);
        throw error;
    }
})