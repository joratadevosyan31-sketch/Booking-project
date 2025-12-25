import { createSlice } from "@reduxjs/toolkit";
import { fetchDeleteEmployee, fetchGetEmployeeByService, fetchGetEmployeesData } from "./EmployeeApi";
import { fetchDeleteBooking } from "../BookingsDataState/BookingsDataApi";

const EmployeeDataSlice = createSlice({
    name: "employeesData",
    initialState: {
        isLoading: false,
        employeesData: [],
        employeebyService: [],
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

            .addCase(fetchGetEmployeeByService.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchGetEmployeeByService.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.employeebyService = payload.employees
            })
            .addCase(fetchGetEmployeeByService.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = payload
            })

            .addCase(fetchDeleteEmployee.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchDeleteEmployee.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.employeesData = payload.employees
            })
            .addCase(fetchDeleteEmployee.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = payload
            })
    }
})

export const employeesDataReducer = EmployeeDataSlice.reducer