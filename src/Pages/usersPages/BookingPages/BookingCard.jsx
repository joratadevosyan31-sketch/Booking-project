import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import SuccessBookingModal from '../../../Modal/SuccessBookingModal/SuccessBookingModal'
import BookingSalonInfo from './BookingSalonInfo'
import Login from '../../../Modal/LoginModal/Login'
import { fetchCreateBooking } from '../../../store/slice/BookingCardDataState/BookingCardApi'

const BookingCard = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isBookingSuccess, setIsBookingSuccess] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { isAuthenticated } = useSelector(state => state.authData)

    const { subServices, employee, date, startTime } = useSelector((state) => state.bookingCardData)

    const isFinalStep = employee && date && startTime

    useEffect(() => {
        document.body.style.overflow =
            (isLoginOpen || isBookingSuccess) ? "hidden" : "auto"

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isLoginOpen, isBookingSuccess])


    const totalPrice =
        subServices?.reduce((sum, s) => sum + (s.price || 0), 0) || 0

    const totalDuration =
        subServices?.reduce((sum, s) => sum + (s.duration || 0), 0) || 0


    const handleBookingAction = () => {

        if (!subServices || subServices.length === 0) {
            navigate("/booking")
            setErrorMessage("Please select at least one service.")
            return
        }

        if (!employee) {
            navigate("/booking/select-professional")
            setErrorMessage("Please select a professional.")
            return
        }

        if (!date || !startTime) {
            navigate("/booking/time-slot")
            setErrorMessage("Please select a date and time.")
            return
        }

        if (!isAuthenticated) {
            setIsLoginOpen(true)
            setErrorMessage("")
            return
        }

        console.log({
            service: subServices[0].service,
            subServices: subServices.map(sub => sub._id),
            employee: employee._id,
            date,
            startTime,
        });


        setErrorMessage("")
        dispatch(fetchCreateBooking({
            service: subServices[0].service,
            subServices: subServices.map(sub => sub._id),
            employee: employee._id,
            date,
            startTime,
        }))
            .unwrap()
            .then(() => setIsBookingSuccess(true))
            .catch((e) => console.error("Booking failed:", e));
    }



    return (
        <>
            <div className="border-[2px] border-gray rounded-[12px] p-[20px] sticky top-28 h-fit">
                <BookingSalonInfo />
                <div className="py-6 overflow-y-auto max-h-[400px]">
                    {subServices?.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {subServices.map((sub, index) => (
                                <div
                                    key={sub._id || index}
                                    className="flex justify-between border-b border-gray pb-3"
                                >
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[20px] font-medium">
                                            {sub.name}
                                        </p>

                                        {employee && (
                                            <p className="text-[18px] text-gray-600">
                                                With {employee.name}
                                            </p>
                                        )}

                                        <p className="text-[16px] text-gray-600">
                                            {sub.duration} min
                                        </p>
                                    </div>

                                    <p className="text-[20px] font-medium">
                                        {sub.price} AMD
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No services selected</p>
                    )}
                </div>

                <div className="flex justify-between border-t-2 py-6">
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-600">
                            {date && startTime
                                ? `${date} at ${startTime}`
                                : "No date/time selected"}
                        </p>

                        <span>Total</span>

                        {totalDuration > 0 && (
                            <span className="text-sm text-gray-600">
                                {totalDuration} min
                            </span>
                        )}
                    </div>

                    <span>
                        {totalPrice > 0 ? `${totalPrice} AMD` : "Free"}
                    </span>
                </div>

                <div className='flex flex-col gap-3 '>
                    {
                        errorMessage && (
                            <p className='text-bold text-[18px] text-red-500 text-center'>{errorMessage}</p>
                        )
                    }
                    <button
                        onClick={handleBookingAction}
                        disabled={!subServices || subServices.length === 0}
                        className="w-full bg-black text-white text-[24px] py-5 rounded-[25px]
                        disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isFinalStep ? "Book now" : "Continue"}
                    </button>
                </div>
            </div>


            {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} />}
            {isBookingSuccess && (
                <SuccessBookingModal setIsBookingSuccess={setIsBookingSuccess} />
            )}
        </>
    )
}

export default BookingCard
