import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetServicesData,
  fetchCreateService,
  fetchUpdateService,
  fetchDeleteService,
  fetchCreateSubService,
  fetchUpdateSubService,
  fetchDeleteSubService,
} from "./ServicesApi";

const ServicesDataSlice = createSlice({
  name: "servicesData",
  initialState: {
    isLoading: false,
    servicesData: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetServicesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetServicesData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.servicesData = payload.services;
      })
      .addCase(fetchGetServicesData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(fetchCreateService.fulfilled, (state) => {
        // Service created, refresh list will be handled by component
      })
      .addCase(fetchUpdateService.fulfilled, (state) => {
        // Service updated, refresh list will be handled by component
      })
      .addCase(fetchDeleteService.fulfilled, (state, { payload }) => {
        state.servicesData = state.servicesData.filter(
          (service) => service._id !== payload.serviceId
        );
      })
      .addCase(fetchCreateSubService.fulfilled, (state) => {
        // Sub-service created, refresh list will be handled by component
      })
      .addCase(fetchUpdateSubService.fulfilled, (state) => {
        // Sub-service updated, refresh list will be handled by component
      })
      .addCase(fetchDeleteSubService.fulfilled, (state, { payload }) => {
        // Update services to remove deleted sub-service
        state.servicesData = state.servicesData.map((service) => ({
          ...service,
          subServices: service.subServices.filter(
            (sub) => sub._id !== payload.subServiceId
          ),
        }));
      });
  },
});

export const servicesDateReducer = ServicesDataSlice.reducer;
