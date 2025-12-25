import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetServicesData = createAsyncThunk(
  "servicesData/fetchGetServicesData",
  async () => {
    try {
      const response = await instance.get("/services");
      return response.data;
    } catch (error) {
      console.error("fetchGetServicesData error:", error);
      throw error;
    }
  }
);

export const fetchCreateService = createAsyncThunk(
  "servicesData/fetchCreateService",
  async (serviceData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await instance.post("/services", serviceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("fetchCreateService error:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchUpdateService = createAsyncThunk(
  "servicesData/fetchUpdateService",
  async ({ serviceId, ...serviceData }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await instance.patch(
        "/services",
        { serviceId, ...serviceData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("fetchUpdateService error:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchDeleteService = createAsyncThunk(
  "servicesData/fetchDeleteService",
  async (serviceId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await instance.delete("/services", {
        headers: { Authorization: `Bearer ${token}` },
        data: { serviceId },
      });
      return { serviceId, ...response.data };
    } catch (error) {
      console.error("fetchDeleteService error:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchCreateSubService = createAsyncThunk(
  "servicesData/fetchCreateSubService",
  async (subServiceData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await instance.post("/services/sub", subServiceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("fetchCreateSubService error:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchUpdateSubService = createAsyncThunk(
  "servicesData/fetchUpdateSubService",
  async ({ subServiceId, ...subServiceData }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await instance.patch(
        "/services/sub",
        { subServiceId, ...subServiceData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("fetchUpdateSubService error:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchDeleteSubService = createAsyncThunk(
  "servicesData/fetchDeleteSubService",
  async (subServiceId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await instance.delete("/services/sub", {
        headers: { Authorization: `Bearer ${token}` },
        data: { subServiceId },
      });
      return { subServiceId, ...response.data };
    } catch (error) {
      console.error("fetchDeleteSubService error:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);
