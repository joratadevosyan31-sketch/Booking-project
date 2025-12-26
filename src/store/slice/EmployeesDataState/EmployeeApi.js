import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosConfig/AxiosConfig";

export const fetchGetEmployeesData = createAsyncThunk(
  "employeesData/fetchGetEmployeesData",
  async () => {
    try {
      const response = await instance.get("/employees");
      const result = response.data;

      return result;
    } catch (error) {
      console.error("fetchGetEmployeesData error:", error);
      throw error;
    }
  }
);

export const fetchGetEmployeeByService = createAsyncThunk(
  "employeesData/fetchGetEmployeeByService",
  async ({ serviceId }) => {
    try {
      console.log(serviceId);

      const responce = await instance.get(`/employees/service/${serviceId}`);
      const result = responce.data;
      console.log(result);

      return result;
    } catch (error) {
      console.log("fetchGetEmployeeByService error :", error);
      throw error;
    }
  }
);

export const fetchDeleteEmployee = createAsyncThunk("employeeData/fetchDeleteEmployee", async (employeeId, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  console.log(employeeId);

  try {
    const response = await instance.delete(`/employees/${employeeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = response.data;
    console.log(result);

    return result;
  } catch (err) {
    console.error("fetchDeleteEmployee error:", err);
    return rejectWithValue(err.response?.data);
  }
}
);

export const fetchCreateEmployee = createAsyncThunk("employeesData/fetchCreateEmployee", async (employeeData, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  console.log(employeeData);

  try {
    const response = await instance.post("/employees", employeeData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("fetchCreateEmployee error:", error);
    return rejectWithValue(error.response?.data);
  }
}
);

export const fetchUpdateEmployee = createAsyncThunk("employeesData/fetchUpdateEmployee", async ({ employeeId, ...employeeData }, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.put(
      `/employees/${employeeId}`,
      { employeeId, ...employeeData },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("fetchUpdateEmployee error:", error);
    return rejectWithValue(error.response?.data);
  }
}
);
