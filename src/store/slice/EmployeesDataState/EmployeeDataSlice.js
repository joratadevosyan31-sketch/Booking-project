import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDeleteEmployee,
  fetchGetEmployeeByService,
  fetchGetEmployeesData,
  fetchCreateEmployee,
  fetchUpdateEmployee,
} from "./EmployeeApi";

const EmployeeDataSlice = createSlice({
  name: "employeesData",
  initialState: {
    isLoading: false,
    employeesData: [],
    employeebyService: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetEmployeesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetEmployeesData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.employeesData = payload.employees;
      })
      .addCase(fetchGetEmployeesData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })

      .addCase(fetchGetEmployeeByService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetEmployeeByService.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.employeebyService = payload.employees;
      })
      .addCase(fetchGetEmployeeByService.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })

      .addCase(fetchDeleteEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeleteEmployee.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.employeesData = payload.employees;
      })
      .addCase(fetchDeleteEmployee.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(fetchCreateEmployee.fulfilled, (state) => {
        // Employee created, refresh list will be handled by component
      })
      .addCase(fetchUpdateEmployee.fulfilled, (state) => {
        // Employee updated, refresh list will be handled by component
      });
  },
});

export const employeesDataReducer = EmployeeDataSlice.reducer;
