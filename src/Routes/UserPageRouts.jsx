import { Route, Routes } from 'react-router-dom'
import Home from "../Pages/usersPages/HomePage/Home"
import BookingLayout from "../Layout/userLayout/BookingLayout"
import SelectProfessional from "../Pages/usersPages/BookingPages/SelectProfessional"
import SelectService from "../Pages/usersPages/BookingPages/SelectService"
import TimeSlots from "../Pages/usersPages/BookingPages/TimeSlot/TimeSlots"

const UserPageRouts = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />

            <Route path="/booking" element={<BookingLayout />}>
                <Route index element={<SelectService />} />
                <Route path="select-professional" element={<SelectProfessional />} />
                <Route path="time-slot" element={<TimeSlots />} />
            </Route>
        </Routes>
    )
}

export default UserPageRouts