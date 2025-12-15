import { createSlice } from "@reduxjs/toolkit";
import { fetchGetAvailableSlots } from "./AvailableSlotsDataApi";

const AvailableSlotsDataSlice = createSlice({
    name: "availableSlotsData",
    initialState: {
        isLoading: false,
        isError: null,
        availableDays: [],
        slotsByDay: {}
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAvailableSlots.pending, (state, { payload }) => {
                state.isLoading = true
            })
            .addCase(fetchGetAvailableSlots.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.availableDays = payload.availableDays
                state.slotsByDay = payload.slotsByDay
            })
            .addCase(fetchGetAvailableSlots.rejected, (state, { payload }) => {
                state.isError = payload
            })
    }
})


export const availableSlotsDataReducer = AvailableSlotsDataSlice.reducer