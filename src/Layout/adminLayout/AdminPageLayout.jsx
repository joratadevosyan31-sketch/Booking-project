import { Outlet } from "react-router"
import AdminSideBar from "../../Components/adminComponents/AdminSideBar/AdminSideBar"
import AdminTopBar from "../../Components/adminComponents/AdminTopBar/AdminTopBar"

const AdminPageLayout = () => {
    return (
        <div>
            <div className="flex h-screen">
                <div className="w-64  bg-slate-600 ">
                    <AdminSideBar />
                </div>

                <div className="flex flex-col flex-1">
                    <div className="border-b-2 border-[#dadada]">
                        <AdminTopBar />
                    </div>
                    <div className="flex-1 overflow-auto p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPageLayout