import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SuccessBookingModal from '../../../Modal/SuccessBookingModal/SuccessBookingModal'
import BookingSalonInfo from './BookingSalonInfo'
import { useLocation, useNavigate } from 'react-router'
import Login from '../../../Modal/LoginModal/Login'

const BookingCard = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const [isBookingSuccess, setIsBookingSuccess] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const { selectedSubservices, professional } = useSelector((state) => state.bookingCardData);

    useEffect(() => {
        if (isLoginOpen || isBookingSuccess) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isLoginOpen, isBookingSuccess])

    // Calculate total price and duration
    const totalPrice = selectedSubservices?.reduce((sum, sub) => sum + (sub.price || 0), 0) || 0;
    const totalDuration = selectedSubservices?.reduce((sum, sub) => sum + (sub.duration || 0), 0) || 0;

    const HandleChangePage = () => {
        if (selectedSubservices && selectedSubservices.length > 0) {
            navigate("select-professional")
        }
        if (professional && professional.length !== 0) {
            navigate("time-slot")
        }
    }


    return (
        <>
            <div className='border-[2px] border-gray rounded-[12px] p-[20px] sticky top-28 h-fit '>
                <BookingSalonInfo />
                <div className='py-6 overflow-y-auto max-h-[400px]'>
                    {selectedSubservices && selectedSubservices.length > 0 ? (
                        <div className='flex flex-col gap-3'>
                            {selectedSubservices.map((sub, index) => (
                                <div key={sub._id || index} className='flex items-center justify-between border-b border-gray pb-3'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-[20px] font-medium text-gray-950'>{sub?.name}</p>
                                        {
                                            professional && (
                                                <p className='text-[20px] font-medium text-gray-600'>{`With ${professional?.name}`}</p>
                                            )
                                        }
                                        <p className='text-[16px] text-gray-600'>{sub?.duration} min</p>
                                    </div>
                                    <p className='text-[20px] font-medium text-gray-950'>{sub?.price} AMD</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-950'>no services selected</p>
                    )}
                </div>
                <div className='flex items-center justify-between border-t-2 border-t-gray py-6'>
                    <div className='flex flex-col gap-1'>
                        <span>Total</span>
                        {selectedSubservices && selectedSubservices.length > 0 && (
                            <span className='text-[14px] text-gray-600'>{totalDuration} min</span>
                        )}
                    </div>
                    <span>{totalPrice > 0 ? `${totalPrice} AMD` : 'free'}</span>
                </div>
                <div className='flex items-center justify-center'>
                    <button
                        onClick={HandleChangePage}
                        disabled={!selectedSubservices || selectedSubservices.length === 0 || (location.pathname === "/booking/select-professional" && !professional)}
                        type='button'
                        className='w-full text-white text-[24px] bg-black py-[20px] px- rounded-[25px] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed'
                    >
                        Continue
                    </button>
                </div>
            </div>

            {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} />}
            {isBookingSuccess && <SuccessBookingModal setIsBookingSuccess={setIsBookingSuccess} />}
        </>

    )
}

export default BookingCard