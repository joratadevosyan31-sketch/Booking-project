import { useEffect, useMemo } from "react"
import CalendarBox from "./Components/CalendarBox"
import ChangeProfessional from "./Components/ChangeProfessional"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedDate, setSelectedTime } from "../../../../store/slice/BookingCardDataState/BookingCardDataSlice"
import TimeBox from "./Components/TimeBox"
import { fetchGetAvailableSlots } from "../../../../store/slice/AvailableSlotsDataState/AvailableSlotsDataApi"


const TimeSlots = () => {

    const dispatch = useDispatch()

    const { selectedDate, selectedTime, professional } = useSelector(state => state.bookingCardData)
    const { availableDays, slotsByDay } = useSelector(state => state.availableSlotsData)

    useEffect(() => {
        dispatch(fetchGetAvailableSlots({ empId: professional?._id }))
    }, [dispatch])

    const handleDateSelect = (date) => {
        dispatch(setSelectedDate(date))
        dispatch(setSelectedTime(null))
    }

    const handleTimeSelect = (time) => {
        dispatch(setSelectedTime(time))
    }

    return (
        <div>
            <div className="flex flex-col gap-5">
                <div>
                    <h2 className='text-[48px] font-bold'>Select Time</h2>
                </div>
                <div className="flex flex-col items-start  gap-8">
                    <ChangeProfessional />
                    <div className="flex flex-col items-start gap-6 ">
                        <div className='w-3/6'>
                            <CalendarBox
                                // disabledDate={(date) => {
                                //     if (date) {
                                //         return true
                                //     }
                                // }}
                                availableDays={availableDays}
                                onDateSelect={handleDateSelect}
                                selectedDate={selectedDate}
                            />
                        </div>
                        <div className="">
                            <TimeBox
                                slotsByDay={slotsByDay}
                                // availableTimeSlots={availableTimeSlots}
                                selectedTime={selectedTime}
                                handleTimeSelect={handleTimeSelect}
                                professional={professional}
                                selectedDate={selectedDate}
                            />
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default TimeSlots