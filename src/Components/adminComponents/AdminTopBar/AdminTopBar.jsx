import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetEmployeesData } from "../../../store/slice/EmployeesDataState/EmployeeApi"
import { fetchGetBookings } from "../../../store/slice/BookingsDataState/BookingsDataApi"

const AdminTopBar = () => {
    const dispatch = useDispatch()

    const employeesData = useSelector(
        state => state.employeesData.employeesData || []
    )

    const bookingsData = useSelector(
        state => state.bookingsData.bookingsData || []
    )

    useEffect(() => {
        dispatch(fetchGetEmployeesData())
        dispatch(fetchGetBookings())
    }, [dispatch])

    const pendingBookingsCount = bookingsData.reduce(
        (count, booking) => booking.status === "pending" ? count + 1 : count,
        0
    )

    return (
        <div className="py-4 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-around w-full">

                <div className="flex flex-col items-center justify-center text-slate-600">
                    <p className="text-[56px] font-bold">
                        {employeesData.length}
                    </p>
                    <span className="text-[20px]">Employees</span>
                </div>

                <div className="w-[2px] h-40 bg-slate-600"></div>

                <div className="flex flex-col items-center justify-center text-slate-600">
                    <p className="text-[56px] font-bold">
                        {pendingBookingsCount}
                    </p>
                    <span className="text-[20px]">Bookings</span>
                </div>

            </div>
        </div>
    )
}

export default AdminTopBar
