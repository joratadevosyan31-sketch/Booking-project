// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchDeleteEmployee, fetchGetEmployeesData } from '../../store/slice/EmployeesDataState/EmployeeApi'
// import { fetchDeleteBooking, fetchGetBookings, fetchPatchBooking } from '../../store/slice/BookingsDataState/BookingsDataApi'
// import { fetchGetServicesData } from '../../store/slice/ServicesDataState/ServicesApi'

// const ServicesTable = () => {

//     const dispatch = useDispatch()

//     const { servicesData, isLoading } = useSelector(state => state.servicesData)
//     const { employeesData } = useSelector(state => state.employeesData)

//     console.log(servicesData);

//     useEffect(() => {
//         dispatch(fetchGetServicesData())
//         dispatch(fetchGetBookings())
//         dispatch(fetchGetEmployeesData())
//     }, [dispatch])

//     const handleStatusChange = (bookingId, status) => {
//         dispatch(fetchPatchBooking({
//             id: bookingId,
//             data: { status }
//         }))
//     }

//     const handleEmployeeChange = (bookingId, employeeId) => {
//         dispatch(fetchPatchBooking({
//             id: bookingId,
//             employee: employeeId
//         }))
//     }

//     const handleDelete = (employeeId) => {
//         dispatch(fetchDeleteEmployee(employeeId))
//     }

//     return (
//         <div className="w-full border border-gray-300 rounded overflow-hidden">

//             <div className="grid grid-cols-9 bg-gray-100 text-gray-700 font-semibold">
//                 <div className="p-2 text-center border-r">Service</div>
//                 <div className="p-2 text-center border-r">Subservices</div>
//                 {/* <div className="p-2 text-center border-r">Service</div> */}
//                 {/* <div className="p-2 text-center border-r">SubServices</div> */}
//                 {/* <div className="p-2 text-center border-r">Break Start</div> */}
//                 {/* <div className="p-2 text-center border-r">Break End</div> */}
//                 {/* <div className="p-2 text-center border-r">Work Start</div> */}
//                 {/* <div className="p-2 text-center border-r">Work End</div> */}
//                 {/* <div className="p-2 text-center">Delete</div> */}
//             </div>

//             {servicesData.map((ser, ind) => {

//                 return (
//                     <div
//                         key={ind}
//                         className={`grid grid-cols-9 border-t text-gray-600 items-center`}
//                     >
//                         {/* <div className="p-2 flex items-center justify-center border-r">
//                             <img src={emp.img} alt="" className='size-24 rounded-full' />
//                         </div> */}
//                         <div className="p-2 text-center border-r">{ser?.name || '-'}</div>
//                         <div className="p-2 text-center border-r">{emp.services.map(s => s.name).join(", ") || '-'}</div>
//                         <div className="p-2 text-center border-r">{
//                             emp.subServices?.length
//                                 ? emp.subServices.map(s => s.name).join(', ')
//                                 : '—'
//                         }</div>
//                         <div className="p-2 text-center border-r">{emp.mainBreakStart}</div>
//                         <div className="p-2 text-center border-r">{emp.mainBreakEnd}</div>
//                         <div className="p-2 text-center border-r">{emp.workStart}</div>
//                         <div className="p-2 text-center border-r">{emp.workEnd}</div>
//                         {/* <div className="p-2 text-center border-r">{new Date(booking.date).toLocaleDateString()}</div> */}
//                         {/* <div className="p-2 text-center border-r">
//                             <select
//                                 value={booking.employee?._id || ''}
//                                 onChange={(e) => handleEmployeeChange(booking._id, e.target.value)}
//                                 className="border rounded px-2 py-1 w-full"
//                             disabled={isCompleted}
//                             >
//                                 <option value="">Select</option>
//                                 {employeesData.map(emp => (
//                                     <option key={emp._id} value={emp._id}>
//                                         {emp.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div> */}

//                         {/* <div className="p-2 text-center border-r">
//                             <select
//                                 value={booking.status}
//                                 onChange={(e) => handleStatusChange(booking._id, e.target.value)}
//                                 className={`border rounded px-2 py-1 text-white
//                                     ${booking.status === 'pending' && 'bg-yellow-500'}
//                                     ${booking.status === 'completed' && 'bg-green-600'}
//                                     ${booking.status === 'canceled' && 'bg-red-600'}
//                                 `}
//                             // disabled={isCompleted}
//                             >
//                                 <option value="pending">Pending</option>
//                                 <option value="completed">Completed</option>
//                                 <option value="canceled">Canceled</option>
//                             </select>
//                         </div> */}

//                         <div className="p-2 text-center">
//                             <button
//                                 onClick={() => handleDelete(emp._id)}
//                                 type='button'
//                                 className="px-3 py-1 bg-red-600 text-white rounded"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

// export default ServicesTable


import React from 'react'

const ServicesTable = () => {
    return (
        <div>ServicesTable</div>
    )
}

export default ServicesTable