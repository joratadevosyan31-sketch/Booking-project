
import { Outlet } from 'react-router'
import BookingPageNav from '../../Pages/usersPages/BookingPages/BookingPageNav'
import BookingCard from '../../Pages/usersPages/BookingPages/BookingCard'

const BookingLayout = () => {
    return (
        <div className="pt-7">
            <BookingPageNav />

            <div className="container flex gap-6 pt-7 pb-20">
                <div className="w-3/5">
                    <Outlet />
                </div>

                <div className="w-2/5 ">
                    <BookingCard />
                </div>
            </div>
        </div>
    )
}

export default BookingLayout