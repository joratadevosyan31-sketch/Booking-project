import { Route, Routes } from 'react-router-dom'
import UserPageRouts from './UserPageRouts'
import AdminPageRoutes from './AdminPageRoutes'
import AdminRoute from './AdminRoute'
import { useSelector } from 'react-redux'

const AppRouter = () => {

    const { isAuthenticated, user } = useSelector((state) => state.authData);

    console.log(user);
    console.log(isAuthenticated);

    return (
        <Routes>
            <Route path="/*" element={<UserPageRouts />} />
            <Route element={<AdminRoute />}>
                <Route path="/admin-dashboard/*" element={<AdminPageRoutes />} />
            </Route>
        </Routes>
    )
}

export default AppRouter