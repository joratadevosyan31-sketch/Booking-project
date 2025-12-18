import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";
import axios from "axios";

export const fetchVerifyUser = createAsyncThunk("authData/fetchVerifyUser", async ({ idToken, verificationCode }) => {

    try {
        const responce = await instance.post(`/auth/verify-and-login`, {
            idToken: idToken,
            verificationCode: verificationCode
        })
        const { token, user } = responce.data
        const result = responce.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("isAuthenticated", "true")
        console.log(result);


        return result
    } catch (error) {
        console.error("fetchVerifyUser error:", error);
        throw error;
    }
})


export const fetchInvalidateLogOut = createAsyncThunk("authData/fetchInvalidateLogOut", async ({ token }) => {

    try {
        const token = localStorage.getItem("token");

        if (!token) throw error("No token found");

        await instance.patch(`/auth/invalidate-and-logout`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated")

        return true;
    } catch (error) {
        console.error("fetchLogout error:", error);
        return rejectWithValue(error);
    }

})