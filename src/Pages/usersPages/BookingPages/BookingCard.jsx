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

    const { selectedSubservice, professional } = useSelector((state) => state.bookingData);

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

    const HandleChangePage = () => {
        if (selectedSubservice && selectedSubservice.length !== 0) {
            navigate("select-professional")
        }
        if (professional && professional.length !== 0) {
            navigate("time-slot")
        }
        // if (selectedSubservice && professional && location.pathname === "/booking/select-professional") {
        //     setIsLoginOpen(true)
        // }
    }


    return (
        <>
            <div className='border-[2px] border-gray rounded-[12px] p-[20px] sticky top-28 h-fit '>
                <BookingSalonInfo />
                <div className='py-6 overflow-y-auto'>
                    {selectedSubservice ? (
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center justify-between  border-b-gray pb-3'>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-[20px] font-medium text-gray-950'>{selectedSubservice?.name}</p>
                                    {
                                        professional ? (
                                            <p className='text-[20px] font-medium text-gray-600'>{`With ${professional?.name}`}</p>
                                        ) : (
                                            null
                                        )
                                    }
                                    <p className='text-[16px] text-gray-600'>{selectedSubservice?.duration} min</p>
                                </div>
                                <p className='text-[20px] font-medium text-gray-950'>{selectedSubservice?.price} AMD</p>
                            </div>
                        </div>
                    ) : (
                        <p className='text-gray-950'>no services selected</p>
                    )}
                </div>
                <div className='flex items-center justify-between border-t-2 border-t-gray py-6'>
                    <span>Total</span>
                    <span>{selectedSubservice ? `${selectedSubservice.price} AMD` : 'free'}</span>
                </div>
                <div className='flex items-center justify-center'>
                    <button
                        onClick={HandleChangePage}
                        disabled={!selectedSubservice || location.pathname === "/booking/select-professional" && !professional}
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