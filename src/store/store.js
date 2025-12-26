import { configureStore } from "@reduxjs/toolkit";
import { servicesDateReducer } from "./slice/ServicesDataState/ServicesDataSlice";
import { employeesDataReducer } from "./slice/EmployeesDataState/EmployeeDataSlice";
import { salonDataReducer } from "./slice/SalonDataState/SalonDataSlice";
import { customerDataReducer } from "./slice/CustomersDataState/CustomersDataSlice";
import { authDataReducer } from "./slice/AuthDataState/AuthDataSlice";
import { dayScheduleDataReducer } from "./slice/DaySchedualeDataState/DayScheduleDataSlice";
import { bookingsDataReducer } from "./slice/BookingsDataState/BookingsDataSlice";
import { bookingCardReducer } from "./slice/BookingCardDataState/BookingCardDataSlice";
import { availableSlotsDataReducer } from "./slice/AvailableSlotsDataState/AvailableSlotsDataSlice";
import { statisticDataReducer } from "./slice/StatisticDataState/StatisticDataSlice";

export const store = configureStore({
    reducer: {
        salonData: salonDataReducer,
        servicesData: servicesDateReducer,
        employeesData: employeesDataReducer,
        customerData: customerDataReducer,
        authData: authDataReducer,
        dayScheduleData: dayScheduleDataReducer,
        bookingCardData: bookingCardReducer,
        bookingsData: bookingsDataReducer,
        availableSlotsData: availableSlotsDataReducer,
        statisticData: statisticDataReducer,
    }
})