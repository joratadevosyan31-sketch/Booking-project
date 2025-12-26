import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetStatisticData = createAsyncThunk("statisticData/fetchGetStatisticData", async () => {
    const token = localStorage.getItem("token")
    console.log(token);
    try {
        const response = await instance.get("/statistics/bookingStateByDay", {
            headers: { Authorization: `Bearer ${token}` },
        })
        const result = response.data
        console.log("statistic response", result);

        return result
    } catch (error) {
        console.error("fetchGetStatisticData error:", error)
        throw error
    }
})