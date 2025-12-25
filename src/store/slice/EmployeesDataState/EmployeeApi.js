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

export const fetchGetEmployeeByService = createAsyncThunk("employeesData/fetchGetEmployeeByService", async ({ serviceId }) => {
    try {
        console.log(serviceId);

        const responce = await instance.get(`/employees/service/${serviceId}`)
        const result = responce.data
        console.log(result);

        return result
    } catch (error) {
        console.log("fetchGetEmployeeByService error :", error);
        throw error
    }
})


export const fetchDeleteEmployee = createAsyncThunk('employeeData/fetchDeleteEmployee', async (employeeId, { rejectWithValue }) => {
    const token = localStorage.getItem("token")
    console.log(employeeId);

    try {
        const response = await instance.delete(`/employees/${employeeId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        const result = response.data
        console.log(result);

        return result
    } catch (err) {
        console.error("fetchDeleteEmployee error:", err)
        return rejectWithValue(err.response?.data)
    }
}
)

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