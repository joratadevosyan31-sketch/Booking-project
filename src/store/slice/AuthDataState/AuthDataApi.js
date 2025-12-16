import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";


export const fetchVerifyUser = createAsyncThunk("authData/fetchVerifyUser", async ({ user }) => {
    console.log(user);

    try {
        const responce = await instance.post("/auth/verify", {
            body: {
                phone: user.phone,
                firebaseUid: user.firebaseUid
            }
        })

        console.log(responce.data);

        const result = responce.data
    } catch (error) {
        console.error("fetchVerifyUser error:", error);
        throw error;
    }
})