import { useDispatch } from 'react-redux'
import CloseIcon from '../../../Components/icons/CloseIcon'
import GoToPrevPageIcon from '../../../Components/icons/GoToPrevPageIcon'
import { clearBooking } from '../../../store/slice/BookingCardDataState/BookingCardDataSlice'
import { useNavigate } from 'react-router'

const BookingPageNav = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClearBooking = () => {
        dispatch(clearBooking())
        navigate("/", { replace: true })

        window.location.reload()
    }

    return (
        <nav className='border-b-2 border-gray sticky top-0 z-50 py-5 bg-white'>
            <div className='container flex items-center justify-between'>
                <GoToPrevPageIcon />
                <button
                    onClick={handleClearBooking}
                    type="button"
                    className="cursor-poniter border-[2px] border-gray rounded-full p-2" >
                    <CloseIcon />
                </button>
            </div>
        </nav>
    )
}

export default BookingPageNav