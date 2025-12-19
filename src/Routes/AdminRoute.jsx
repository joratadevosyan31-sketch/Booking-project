import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
    const { isAuthenticated, user } = useSelector((state) => state.authData);

    if (!isAuthenticated || user?.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
