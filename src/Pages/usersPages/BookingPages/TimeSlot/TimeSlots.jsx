import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarBox from "./Components/CalendarBox";
import ChangeProfessional from "./Components/ChangeProfessional";
import TimeBox from "./Components/TimeBox";
import {
    clearBookingDateTime,
    setSelectedDate,
    setSelectedTime,
} from "../../../../store/slice/BookingCardDataState/BookingCardDataSlice";
import { fetchGetAvailableSlots } from "../../../../store/slice/AvailableSlotsDataState/AvailableSlotsDataApi";
import { fetchCreateBooking } from "../../../../store/slice/BookingCardDataState/BookingCardApi";

const TimeSlots = () => {

    const dispatch = useDispatch();

    const { subServices, employee, date, startTime } = useSelector((state) => state.bookingCardData);

    const { availableDays, slotsByDay } = useSelector((state) => state.availableSlotsData);

    useEffect(() => {
        if (employee?._id) {
            dispatch(fetchGetAvailableSlots({ empId: employee._id }));
        }
    }, [dispatch, employee]);

    useEffect(() => {
        if (availableDays?.length && !date) {
            dispatch(setSelectedDate(availableDays[0]));
            dispatch(setSelectedTime(null))
        }
    }, [availableDays, date, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearBookingDateTime());
        };
    }, [dispatch]);

    const handleDateSelect = (selectedDate) => {
        dispatch(setSelectedDate(selectedDate));
        dispatch(setSelectedTime(null));
    };

    const handleTimeSelect = (selectedTime) => {
        dispatch(setSelectedTime(selectedTime));

        dispatch(fetchCreateBooking({
                    service: subServices[0].service,
                    subServices: subServices.map(sub => sub._id),
                    employee: employee._id,
                    date,
                    startTime,
                }))
    };

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-[48px] font-bold">Select Time</h2>

            <div className="flex flex-col items-start gap-8">
                <ChangeProfessional />

                <div className="flex flex-col items-start gap-6">
                    <div className="w-3/6">
                        <CalendarBox
                            availableDays={availableDays}
                            selectedDate={date}
                            setSelectedDate={handleDateSelect}
                        />
                    </div>

                    <TimeBox
                        slotsByDay={slotsByDay}
                        startTime={startTime}
                        handleTimeSelect={handleTimeSelect}
                        employee={employee}
                        date={date}
                        setSelectedDate={handleDateSelect}
                    />
                </div>
            </div>
        </div>
    );
};

export default TimeSlots;
