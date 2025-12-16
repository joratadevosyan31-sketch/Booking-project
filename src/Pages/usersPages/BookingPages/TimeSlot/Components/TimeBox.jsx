import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSelectedDate } from "../../../../../store/slice/BookingCardDataState/BookingCardDataSlice"


const TimeBox = ({ slotsByDay, selectedTime, handleTimeSelect, professional, selectedDate }) => {

    const [availableByDays, setAvailableByDays] = useState(slotsByDay[selectedDate])
    const dispatch = useDispatch()

    useEffect(() => {
        setAvailableByDays(slotsByDay[selectedDate])
    }, [selectedDate])

    return (
        <div className="flex flex-wrap items-center gap-2 ">
            {console.log(slotsByDay)}
            {availableByDays?.length > 0 ? (
                availableByDays?.map((slot, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleTimeSelect(slot)}
                        // disabled={slot.isBooked}
                        className={`text-[14px] font-semibold p-3 border-[2px] rounded-full transition-colors ${selectedTime === slot
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'border-gray hover:border-blue-300 hover:bg-blue-50'
                            }`}
                    >
                        {slot}
                    </button>
                ))
            ) : (
                <p className="text-gray-500">
                    {!professional
                        ? 'Please select a professional first'
                        : !selectedDate
                            ? 'Please select a date first'
                            : 'No available time slots for this date'

                    }
                </p>
            )}
        </div>)
}

export default TimeBox