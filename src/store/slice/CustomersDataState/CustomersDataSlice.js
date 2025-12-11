import { createSlice } from "@reduxjs/toolkit";
import { fetchGetCustomer } from "./CustomersApi";

const CustomerDataSlice = createSlice({
    name: "customerData",
    initialState: {
        isLoading: false,
        customerData: [],
        isError: false,
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchGetCustomer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchGetCustomer.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.customerData = payload.customers
            })
            .addCase(fetchGetCustomer.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = payload
            })
    }
})

export const customerDataReducer = CustomerDataSlice.reducer