import { Route, Routes } from 'react-router-dom'
import UserPageRouts from './UserPageRouts'
import AdminPageRoutes from './AdminPageRoutes'
import AdminProtected from './AdminProtected'

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/*" element={<UserPageRouts />} />
            <Route element={<AdminProtected />}>
                <Route path="/admin-dashboard/*" element={<AdminPageRoutes />} />
            </Route>
        </Routes>
    )
}

export default AppRouter