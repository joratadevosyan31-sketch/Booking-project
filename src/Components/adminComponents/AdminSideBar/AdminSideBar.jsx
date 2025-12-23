import { NavLink, useNavigate } from "react-router"
import SignOutIcon from "../../icons/SignOutIcon"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchInvalidateLogOut } from "../../../store/slice/AuthDataState/AuthDataApi"

const AdminSideBar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isAuthenticated, token } = useSelector(state => state.authData)

    const [isLoginOpen, setIsLoginOpen] = useState(false)


    useEffect(() => {
        document.body.style.overflow = isLoginOpen ? "hidden" : "auto"

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isLoginOpen])


    const handleSignOut = () => {
        dispatch(fetchInvalidateLogOut({ token }))
        navigate("/", { replace: true })

        // window.location.reload()
    }

    return (
        <aside className='p-8 pb-14 h-screen fixed top-0 left-0 z-50 '>
            <div className='h-full flex flex-col justify-between'>
                <div className="flex flex-col gap-11">
                    <div className='flex items-center gap-4'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQewkZtH3IPZPy6nPrOBmwY42zlVFKcZAPSkw&s" alt="" className='size-12 rounded-full' />
                        <h2 className='text-[24px] font-bold'>Paragon</h2>
                    </div>
                    <ul className='flex flex-col text-[24px] text-white' >
                        <li className="py-2 px-4 cursor-pointer">
                            <NavLink to="/admin-dashboard">Salon</NavLink>
                        </li>
                        <li className="py-2 px-4 cursor-pointer">
                            <NavLink to="/admin-dashboard/bookings">Bookings</NavLink>
                        </li>
                        <li className="py-2 px-4">
                            <NavLink to="/admin-dashboard/employees">Employees</NavLink>
                        </li>
                        <li className="py-2 px-4">
                            <NavLink to="/admin-dashboard/services">Services</NavLink>
                        </li>
                    </ul>
                </div>

                <div className=''>
                    <button
                        onClick={handleSignOut}
                        type='button'
                        className="flex items-center gap-2 text-white px-1 py-3 rounded-full"
                    >
                        <SignOutIcon />
                        Sign out
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default AdminSideBar