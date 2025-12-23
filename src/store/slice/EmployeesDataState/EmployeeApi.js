import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetEmployeesData = createAsyncThunk("employeesData/fetchGetEmployeesData", async () => {
    try {
        const response = await instance.get("/employees")
        const result = response.data

        return result
    } catch (error) {
        console.error("fetchGetEmployeesData error:", error);
        throw error;
    }
})


export const fetchDeleteEmployee = createAsyncThunk("employeesData/fetchDeleteEmployee", async () => {
    try {
        const responce = await instance.delete("/employees")
        const result = responce.data

        return result
    } catch (error) {
        console.error("fetchDeleteEmployee error:", error)
        throw error
    }
})


export const fetchPutEmployee = createAsyncThunk("employeesData/fetchPutEmployee", async () => {
    try {
        const responce = await instance.put("/employees")
        const result = responce.data

        return result
    } catch (error) {
        console.error("fetchPutEmployee error:", error);

        throw error
    }
})