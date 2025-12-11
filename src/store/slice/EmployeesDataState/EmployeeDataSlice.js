import { createSlice } from "@reduxjs/toolkit";
import { fetchGetEmployeesData } from "./EmployeeApi";

const EmployeeDataSlice = createSlice({
    name: "employeesData",
    initialState: {
        isLoading: false,
        employeesData: [],
        isError: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetEmployeesData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchGetEmployeesData.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.employeesData = payload.employees
            })
            .addCase(fetchGetEmployeesData.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = payload
            })
    }
})

export const employeesDataReducer = EmployeeDataSlice.reducer