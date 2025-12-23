import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtected = () => {

    const { isAuthenticated, user, isLoading } = useSelector((state) => state.authData);

    if (isLoading) return null;

    const isAdmin = !!user && String(user.role || "").toLowerCase() === "admin";

    if (!isAuthenticated || !isAdmin) {
        console.log("userrrr");
        return <Navigate to="/" replace />;

    }

    return <Outlet />;
};

export default AdminProtected;
