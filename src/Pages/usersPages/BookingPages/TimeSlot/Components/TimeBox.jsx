import { useEffect, useState } from "react";

const TimeBox = ({ slotsByDay, startTime, handleTimeSelect, employee, date, setSelectedDate }) => {
    const [availableByDays, setAvailableByDays] = useState([]);

    useEffect(() => {
        const sortedDates = Object.keys(slotsByDay).sort();

        // Try to get current date slots first
        let selectedSlots = slotsByDay[date] || [];
        let newSelectedDate = date;

        // If no slots for current date, find first next date with slots
        if (!selectedSlots || selectedSlots.length === 0) {
            const nextAvailableDate = sortedDates.find(d => slotsByDay[d]?.length > 0);
            if (nextAvailableDate) {
                selectedSlots = slotsByDay[nextAvailableDate];
                newSelectedDate = nextAvailableDate;
            }
        }

        setAvailableByDays(selectedSlots);

        // Auto-update parent selected date
        if (setSelectedDate && newSelectedDate !== date) {
            setSelectedDate(newSelectedDate);
        }

        // Auto-select first available slot if current startTime not in slots
        if (selectedSlots.length > 0 && !selectedSlots.includes(startTime)) {
            handleTimeSelect(selectedSlots[0]);
        }
    }, [date, slotsByDay, startTime, handleTimeSelect, setSelectedDate]);

    return (
        <div className="flex flex-wrap items-center gap-2">
            {availableByDays?.length > 0 ? (
                availableByDays.map((slot, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleTimeSelect(slot)}
                        className={`text-[14px] font-semibold p-3 border-[2px] rounded-full transition-colors ${startTime === slot
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-gray hover:border-blue-300 hover:bg-blue-50"
                            }`}
                    >
                        {slot}
                    </button>
                ))
            ) : (
                <p className="text-gray-500">
                    {!employee
                        ? "Please select an employee first"
                        : !date
                            ? "Please select a date first"
                            : "No available time slots for this date"}
                </p>
            )}
        </div>
    );
};

export default TimeBox;
