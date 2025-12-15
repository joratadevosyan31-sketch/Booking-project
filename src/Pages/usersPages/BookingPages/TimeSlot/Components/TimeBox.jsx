

const TimeBox = ({ slotsByDay, selectedTime, handleTimeSelect, professional, selectedDate }) => {

    return (
        <div className="flex flex-wrap items-center gap-2 ">
            {console.log(slotsByDay)}
            {slotsByDay.length > 0 ? (
                slotsByDay["2025-12-16"].map((slot, index) => (
                    <button
                        key={index}
                        type="button"
                        // onClick={() => !slot.isBooked && handleTimeSelect(slot.time)}
                        disabled={slot.isBooked}
                        className={`text-[14px] font-semibold p-3 border-[2px] rounded-full transition-colors ${slot.isBooked
                            ? 'bg-gray-400 text-white border-gray-400 cursor-not-allowed opacity-50'
                            : selectedTime === slot.time
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