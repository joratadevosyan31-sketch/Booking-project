import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetEmployeesData = createAsyncThunk("employeesData/fetchGetEmployeesData", async () => {
    try {
        const response = await instance.get("/employees")
        const result = response.data
        // console.log(response)

        return result
    } catch (error) {
        console.error("fetchGetEmployeesData error:", error);
        throw error;
    }
})