import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetServicesData = createAsyncThunk("servicesData/fetchGetServicesData", async () => {
    try {
        const response = await instance.get("/services");
        // console.log(response);

        return response.data
    } catch (error) {
        console.error("fetchGetServicesData error:", error);
        throw error;
    }
})