import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";


export const fetchGetAvailableSlots = createAsyncThunk("availableSlotsData/fetchGetAvailableSlots", async ({ empId }) => {
    console.log(empId);

    try {
        const response = await instance.get(`slots/available-slots?employeeId=${empId}`)
        const result = response.data

        console.log(result);

        return result
    } catch (error) {
        console.error("fetchGetAvailableSlots error:", error);
        throw error;
    }
})