import { Route, Routes } from 'react-router-dom'
import AdminPageLayout from '../Layout/adminLayout/AdminPageLayout'
import EmployeeTable from '../Pages/adminPages/EmployeeTable'
import ServicesTable from '../Pages/adminPages/ServicesTable'
import BookingTable from '../Pages/adminPages/BookingTable'
import SalonPage from '../Pages/adminPages/SalonPage'

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