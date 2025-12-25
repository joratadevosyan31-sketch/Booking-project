import { Route, Routes } from 'react-router-dom'
import UserPageRouts from './UserPageRouts'
import AdminPageRoutes from './AdminPageRoutes'
import AdminProtected from './AdminProtected'
import NotFoundPage from '../Pages/NotFoundPage'

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/*" element={<UserPageRouts />} />
            <Route element={<AdminProtected />}>
                <Route path="/admin-dashboard/*" element={<AdminPageRoutes />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRouter