import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";


export const fetchVerifyUser = createAsyncThunk("authData/fetchVerifyUser", async ({ idToken, verificationCode }) => {

    try {
        const responce = await instance.post(`/auth/verify-and-login`, {
            idToken: idToken,
            verificationCode: verificationCode
        })
        const result = responce.data
        console.log(result);

        return result
    } catch (error) {
        console.error("fetchVerifyUser error:", error);
        throw error;
    }
})