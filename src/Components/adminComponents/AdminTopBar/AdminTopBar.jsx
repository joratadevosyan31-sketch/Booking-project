import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetEmployeesData } from "../../../store/slice/EmployeesDataState/EmployeeApi"
import { fetchGetBookings } from "../../../store/slice/BookingsDataState/BookingsDataApi"

const AdminTopBar = () => {

    const dispatch = useDispatch()
    const { employeesData } = useSelector(state => state.employeesData)
    const { bookingsData } = useSelector(state => state.bookingsData)

    useEffect(() => {
        if (!employeesData || employeesData.length === 0) {
            dispatch(fetchGetEmployeesData)
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchGetBookings())
    }, [dispatch])

    const pendingBookings = bookingsData.filter(book => book.status === "pending")

    return (
        <div className="py-4 sticky top-0">
            <div className="flex items-center justify-around w-full">
                <div className="flex flex-col items-center justify-center ">
                    <p className="text-[56px] font-bold">{employeesData?.length}</p>
                    <span className="text-[20px]">Employees</span>
                </div>
                <div className="w-[2px] h-40 bg-[#dadada]"></div>
                <div className="flex flex-col items-center justify-center ">
                    <p className="text-[56px] font-bold">{pendingBookings?.length}</p>
                    <span className="text-[20px]">Bookings</span>
                </div>
            </div>
        </div>
    )
}

export default AdminTopBar