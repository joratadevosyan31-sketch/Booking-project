import { Route, Routes } from 'react-router-dom'
import UserPageRouts from './UserPageRouts'
import AdminPageRoutes from './AdminPageRoutes'


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<UserPageRouts />} />
            <Route path="/admin-dashboard/*" element={<AdminPageRoutes />} />
        </Routes>
    )
}

export default AppRouter