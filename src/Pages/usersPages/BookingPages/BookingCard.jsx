// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import SuccessBookingModal from '../../../Modal/SuccessBookingModal/SuccessBookingModal'
// import BookingSalonInfo from './BookingSalonInfo'
// import { useLocation, useNavigate } from 'react-router'
// import Login from '../../../Modal/LoginModal/Login'

// const BookingCard = () => {

//     const navigate = useNavigate()
//     const location = useLocation()

//     const [isBookingSuccess, setIsBookingSuccess] = useState(false)
//     const [isLoginOpen, setIsLoginOpen] = useState(false)

//     const { subServices, employee, date, startTime } = useSelector((state) => state.bookingCardData);

//     useEffect(() => {
//         if (isLoginOpen || isBookingSuccess) {
//             document.body.style.overflow = "hidden"
//         } else {
//             document.body.style.overflow = "auto"
//         }
//         return () => {
//             document.body.style.overflow = "auto"
//         }
//     }, [isLoginOpen, isBookingSuccess])

//     const totalPrice = subServices?.reduce((sum, sub) => sum + (sub.price || 0), 0) || 0;
//     const totalDuration = subServices?.reduce((sum, sub) => sum + (sub.duration || 0), 0) || 0;

//     const HandleChangePage = () => {
//         if (subServices && subServices.length > 0) {
//             navigate("select-employee")
//         }
//         if (employee && employee.length !== 0) {
//             navigate("time-slot")
//         }
//     }


//     return (
//         <>
//             <div className='border-[2px] border-gray rounded-[12px] p-[20px] sticky top-28 h-fit '>
//                 <BookingSalonInfo />
//                 <div className='py-6 overflow-y-auto max-h-[400px]'>
//                     {subServices && subServices.length > 0 ? (
//                         <div className='flex flex-col gap-3'>
//                             {subServices.map((sub, index) => (
//                                 <div key={sub._id || index} className='flex items-center justify-between border-b border-gray pb-3'>
//                                     <div className='flex flex-col gap-1'>
//                                         <p className='text-[20px] font-medium text-gray-950'>{sub?.name}</p>
//                                         {
//                                             employee && (
//                                                 <p className='text-[20px] font-medium text-gray-600'>{`With ${employee?.name}`}</p>
//                                             )
//                                         }
//                                         <p className='text-[16px] text-gray-600'>{sub?.duration} min</p>
//                                     </div>
//                                     <p className='text-[20px] font-medium text-gray-950'>{sub?.price} AMD</p>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p className='text-gray-950'>no services selected</p>
//                     )}
//                 </div>
//                 <div className='flex items-center justify-between border-t-2 border-t-gray py-6'>
//                     <div className='flex flex-col gap-1'>
//                         <p className='text-[20px] font-medium text-gray-600'>
//                             {date && startTime ? `${date} at ${startTime}` : "No date/time selected"}
//                         </p>
//                         <span>Total</span>
//                         {subServices && subServices.length > 0 && (
//                             <span className='text-[14px] text-gray-600'>{totalDuration} min</span>
//                         )}
//                     </div>
//                     <span>{totalPrice > 0 ? `${totalPrice} AMD` : 'free'}</span>
//                 </div>
//                 <div className='flex items-center justify-center'>
//                     <button
//                         onClick={HandleChangePage}
//                         disabled={!subServices || subServices.length === 0 || (location.pathname === "/booking/select-employee" && !employee)}
//                         type='button'
//                         className='w-full text-white text-[24px] bg-black py-[20px] px- rounded-[25px] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed'
//                     >
//                         Continue
//                     </button>
//                 </div>
//             </div>

//             {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} />}
//             {isBookingSuccess && <SuccessBookingModal setIsBookingSuccess={setIsBookingSuccess} />}
//         </>

//     )
// }

// export default BookingCard




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

    const { isAuthenticated } = useSelector(state => state.authData)

    const { subServices, employee, date, startTime } = useSelector((state) => state.bookingCardData)


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
        if (!subServices || subServices.length === 0) return

        if (!employee) {
            navigate("select-professional")
            return
        }

        if (!date || !startTime) {
            navigate("time-slot")
            return
        }

        if (!isAuthenticated) {
            setIsLoginOpen(true)
            return
        }

        setIsBookingSuccess(true)

        dispatch(fetchCreateBooking({
            subServices,
            employee,
            date,
            startTime
        }))
    }

    const isFinalStep =
        employee && date && startTime

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


                <button
                    onClick={handleBookingAction}
                    disabled={!subServices || subServices.length === 0}
                    className="w-full bg-black text-white text-[24px] py-5 rounded-[25px]
                        disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isFinalStep ? "Book now" : "Continue"}
                </button>
            </div>


            {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} />}
            {isBookingSuccess && (
                <SuccessBookingModal setIsBookingSuccess={setIsBookingSuccess} />
            )}
        </>
    )
}

export default BookingCard
