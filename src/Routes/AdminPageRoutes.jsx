import { Route, Routes } from 'react-router-dom'
import AdminPageLayout from '../Layout/adminLayout/AdminPageLayout'
import EmployeeTable from '../Pages/adminPages/EmployeeTable/EmployeeTable'
import ServicesTable from '../Pages/adminPages/ServiceTable/ServicesTable'
import SalonPage from '../Pages/adminPages/SalonPage'
import BookingTable from '../Pages/adminPages/BookingTable/BookingTable'

const AdminPageRoutes = () => {

    return (
        <Routes>
            <Route element={<AdminPageLayout />}>
                <Route index element={<SalonPage />} />
                <Route path='bookings' element={<BookingTable />} />
                <Route path='employees' element={<EmployeeTable />} />
                <Route path='services' element={<ServicesTable />} />
            </Route>
        </Routes>
    )
}

export default AdminPageRoutes