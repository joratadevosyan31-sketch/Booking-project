import { useEffect, useMemo } from "react"
import CalendarBox from "./Components/CalendarBox"
import ChangeProfessional from "./Components/ChangeProfessional"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetDayScheduleData } from "../../../../store/slice/DaySchedualeDataState/DaySchedulDataApi"
import { setSelectedDate, setSelectedTime } from "../../../../store/slice/BookingDataState/BookingDataSlice"


const TimeSlots = () => {

    const dispatch = useDispatch()

    const { selectedDate, selectedTime, professional } = useSelector(state => state.bookingData)
    const { dayScheduleData } = useSelector((state) => state.dayScheduleData)

    useEffect(() => {
        if (!dayScheduleData || dayScheduleData.length === 0) {
            dispatch(fetchGetDayScheduleData())
        }
    }, [dispatch, dayScheduleData])

    console.log(dayScheduleData);

    // Handle date selection from calendar
    const handleDateSelect = (date) => {
        dispatch(setSelectedDate(date))
        // Clear selected time when date changes
        dispatch(setSelectedTime(null))
    }

    // Handle time slot selection
    const handleTimeSelect = (time) => {
        dispatch(setSelectedTime(time))
    }

    // Generate time slots based on selected date and dayScheduleData
    const availableTimeSlots = useMemo(() => {
        if (!selectedDate || !dayScheduleData || dayScheduleData.length === 0 || !professional) {
            return []
        }

        // Find schedule for the selected date and professional
        const scheduleForDate = dayScheduleData.find(schedule => {
            const scheduleDate = new Date(schedule.date || schedule.day || schedule.schedule_date)
            const selectedDateObj = new Date(selectedDate)
            const dateMatches = scheduleDate.toDateString() === selectedDateObj.toDateString()
            
            // Check if schedule is for the selected professional
            const employeeMatches = schedule.employee?._id === professional._id || 
                                   schedule.employeeId === professional._id ||
                                   schedule.employee === professional._id ||
                                   !schedule.employee // If no employee filter, show all
            return dateMatches && employeeMatches
        })

        if (!scheduleForDate) {
            return []
        }

        // Get start_time and end_time from schedule
        const startTime = scheduleForDate.start_time || scheduleForDate.startTime || '09:00'
        const endTime = scheduleForDate.end_time || scheduleForDate.endTime || '18:00'

        // Get booked slots from schedule
        const bookedSlots = scheduleForDate.booked_slots || 
                           scheduleForDate.bookedSlots || 
                           scheduleForDate.bookings || 
                           scheduleForDate.booked_times ||
                           []

        // Generate all time slots with 15-minute intervals from start_time to end_time
        const allSlots = []
        const start = new Date(`${selectedDate}T${startTime}:00`)
        const end = new Date(`${selectedDate}T${endTime}:00`)
        
        let current = new Date(start)
        while (current < end) {
            const hours = current.getHours().toString().padStart(2, '0')
            const minutes = current.getMinutes().toString().padStart(2, '0')
            const timeString = `${hours}:${minutes}`
            
            // Check if this slot is booked
            const isBooked = bookedSlots.some(booked => {
                if (typeof booked === 'string') {
                    return booked === timeString || booked.startsWith(timeString)
                }
                if (booked?.time) {
                    return booked.time === timeString || booked.time.startsWith(timeString)
                }
                return false
            })
            
            allSlots.push({
                time: timeString,
                isBooked: isBooked
            })
            
            current.setMinutes(current.getMinutes() + 15)
        }
        
        return allSlots
    }, [selectedDate, dayScheduleData, professional])

    return (
        <div>
            <div className="flex flex-col gap-5">
                <div>
                    <h2 className='text-[48px] font-bold'>Select Time</h2>
                </div>
                <div className="flex flex-col items-start  gap-8">
                    <ChangeProfessional />
                    <div className="flex items-start gap-6 ">
                        <div className='w-3/6'>
                            <CalendarBox 
                                onDateSelect={handleDateSelect}
                                selectedDate={selectedDate}
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-2 ">
                            {availableTimeSlots.length > 0 ? (
                                availableTimeSlots.map((slot, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => !slot.isBooked && handleTimeSelect(slot.time)}
                                        disabled={slot.isBooked}
                                        className={`text-[14px] font-semibold p-3 border-[2px] rounded-full transition-colors ${
                                            slot.isBooked
                                                ? 'bg-gray-400 text-white border-gray-400 cursor-not-allowed opacity-50'
                                                : selectedTime === slot.time
                                                ? 'bg-blue-500 text-white border-blue-500'
                                                : 'border-gray hover:border-blue-300 hover:bg-blue-50'
                                        }`}
                                    >
                                        {slot.time}
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500">
                                    {!professional 
                                        ? 'Please select a professional first' 
                                        : !selectedDate 
                                        ? 'Please select a date first' 
                                        : 'No available time slots for this date'}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* <button
                        type='button'
                        className='p-1 rounded-full'
                    >
                        <svg className='size-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" /></svg>
                    </button> */}
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default TimeSlots