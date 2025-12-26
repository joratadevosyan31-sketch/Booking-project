import { createSlice } from "@reduxjs/toolkit";
import { fetchGetStatisticData } from "./StatisticApi";


export const StatisticDataSlice = createSlice({
    name: "statisticData",
    initialState: {
        isLoading: false,
        statisticData: [],
        isError: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetStatisticData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchGetStatisticData.fulfilled, (state, { payload }) => {
                state.isLoading = false
                console.log(payload);
                state.statisticData = payload.statistic
            })
            .addCase(fetchGetStatisticData.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = payload
            })
    }

})

export const statisticDataReducer = StatisticDataSlice.reducer