import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDeleteEmployee, fetchGetEmployeesData } from '../../store/slice/EmployeesDataState/EmployeeApi'
import { fetchGetBookings, fetchPatchBooking } from '../../store/slice/BookingsDataState/BookingsDataApi'

const EmployeeTable = () => {

    const dispatch = useDispatch()

    const { bookingsData, isLoading } = useSelector(state => state.bookingsData)
    const { employeesData } = useSelector(state => state.employeesData)

    console.log(employeesData);

    useEffect(() => {
        dispatch(fetchGetBookings())
        dispatch(fetchGetEmployeesData())
    }, [dispatch])

    const handleStatusChange = (bookingId, status) => {
        dispatch(fetchPatchBooking({
            id: bookingId,
            data: { status }
        }))
    }

    const handleEmployeeChange = (bookingId, employeeId) => {
        dispatch(fetchPatchBooking({
            id: bookingId,
            employee: employeeId
        }))
    }

    const handleDelete = (employeeId) => {
        dispatch(fetchDeleteEmployee(employeeId))
    }

    return (

        <div className="w-full border border-gray-300 rounded overflow-hidden">

            <div className="grid grid-cols-8 bg-gray-100 text-gray-700 font-semibold">
                <div className="p-2 text-center border-r">Image</div>
                <div className="p-2 text-center border-r">Name</div>
                {/* <div className="p-2 text-center border-r">Profession</div> */}
                <div className="p-2 text-center border-r">Service</div>
                <div className="p-2 text-center border-r">Break Start</div>
                <div className="p-2 text-center border-r">Break End</div>
                <div className="p-2 text-center border-r">Work Start</div>
                <div className="p-2 text-center border-r">Work End</div>
                <div className="p-2 text-center">Action</div>
            </div>

            {employeesData.map((emp, ind) => {
                return (
                    <div
                        key={ind}
                        className={`grid grid-cols-8 border-t text-gray-600 items-center`}
                    >
                        <div className="p-2 flex items-center justify-center border-r">
                            <img src={emp.img} alt="" className='size-16 rounded-full' />
                        </div>
                        <div className="p-2 text-center border-r">{emp?.name || '-'}</div>
                        {/* <div className="p-2 text-center border-r">{emp.profession || '-'}</div> */}
                        <div className="p-2 text-center border-r">{emp.services.map(s => s.name).join(", ") || '-'}</div>
                        <div className="p-2 text-center border-r">{emp.mainBreakStart}</div>
                        <div className="p-2 text-center border-r">{emp.mainBreakEnd}</div>
                        <div className="p-2 text-center border-r">{emp.workStart}</div>
                        <div className="p-2 text-center border-r">{emp.workEnd}</div>

                        <div className="p-2 text-center">
                            <button
                                onClick={() => handleDelete(emp._id)}
                                type='button'
                                className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}


export default EmployeeTable