import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSelectedDate } from "../../../../../store/slice/BookingCardDataState/BookingCardDataSlice"


const TimeBox = ({ slotsByDay, startTime, handleTimeSelect, employee, date }) => {

    const [availableByDays, setAvailableByDays] = useState(slotsByDay[date])
    const dispatch = useDispatch()

    useEffect(() => {
        setAvailableByDays(slotsByDay[date])
    }, [date])

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
                        className={`text-[14px] font-semibold p-3 border-[2px] rounded-full transition-colors ${startTime === slot
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'border-gray hover:border-blue-300 hover:bg-blue-50'
                            }`}
                    >
                        {slot}
                    </button>
                ))
            ) : (
                <p className="text-gray-500">
                    {!employee
                        ? 'Please select a employee first'
                        : !date
                            ? 'Please select a date first'
                            : 'No available time slots for this date'

                    }
                </p>
            )}
        </div>)
}

export default TimeBox