import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASEURL

export const instance = axios.create({
    baseURL: BASE_URL
});

export const custom = axios.create({
    baseURL: BASE_URL
})