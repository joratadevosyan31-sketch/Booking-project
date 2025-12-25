import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select, Button, Avatar } from 'antd'

import { fetchGetEmployeesData } from '../../store/slice/EmployeesDataState/EmployeeApi'
import { fetchDeleteBooking, fetchGetBookings, fetchPatchBooking } from '../../store/slice/BookingsDataState/BookingsDataApi'

const BookingTable = () => {
    const dispatch = useDispatch()

    const { bookingsData } = useSelector(state => state.bookingsData)
    const { employeesData } = useSelector(state => state.employeesData)

    console.log(bookingsData);

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

    const handleEmployeeChange = (bookingId, employeeName) => {
        dispatch(fetchPatchBooking({
            id: bookingId,
            data: { employee: employeeName }
        }))
    }

    const handleSubServicesChange = (bookingId, subServiceNames) => {
        dispatch(fetchPatchBooking({
            id: bookingId,
            data: { subServices: subServiceNames }
        }))
    }

    const handleDelete = (bookingId) => {
        dispatch(fetchDeleteBooking(bookingId))
    }

    return (
        <div className="w-full border border-gray-300 rounded overflow-hidden">
            <div className="grid grid-cols-9 bg-gray-100 text-gray-700 font-semibold">
                <div className="p-2 text-center border-r">Customer</div>
                <div className="p-2 text-center border-r">Service</div>
                <div className="p-2 text-center border-r">SubServices</div>
                <div className="p-2 text-center border-r">Start</div>
                <div className="p-2 text-center border-r">End</div>
                <div className="p-2 text-center border-r">Date</div>
                <div className="p-2 text-center border-r">Employee</div>
                <div className="p-2 text-center border-r">Status</div>
                <div className="p-2 text-center">Action</div>
            </div>

            {bookingsData.map((booking, ind) => {
                const isCompleted = booking.status === 'completed'

                return (
                    <div
                        key={ind}
                        className={`grid grid-cols-9 border-t items-center text-gray-600 ${isCompleted ? 'opacity-60 pointer-events-none' : ''}`}
                    >
                        <div className="p-2 text-center border-r">{booking.customer?.phone || 'Guest'}</div>
                        <div className="p-2 text-center border-r">{booking.service?.name || '-'}</div>
                        <div className="p-2 text-center border-r">
                            <Select
                                mode="multiple"
                                allowClear
                                className="w-full"
                                value={booking.subServices?.map(s => s.name)}
                                onChange={(values) =>
                                    handleSubServicesChange(booking._id, values)
                                }
                                disabled={isCompleted}
                            >
                                {booking.service?.subServices?.map((sub, ind) => (
                                    <Select.Option key={ind} value={sub.name}>
                                        {sub.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>

                        <div className="p-2 text-center border-r">{booking.startTime}</div>
                        <div className="p-2 text-center border-r">{booking.endTime}</div>
                        <div className="p-2 text-center border-r">
                            {new Date(booking.date).toLocaleDateString()}
                        </div>

                        <div className="p-2 text-center border-r">
                            <Select
                                className="w-full"
                                value={booking.employee?.name}
                                onChange={(value) =>
                                    handleEmployeeChange(booking._id, value)
                                }
                                disabled={isCompleted}
                                optionLabelProp="label"
                            >
                                {employeesData.map((emp, ind) => (
                                    <Select.Option
                                        key={ind}
                                        value={emp.name}
                                        label={
                                            <div className="flex items-center gap-2">
                                                <Avatar src={emp.img} size="small">
                                                    {emp.name?.[0]}
                                                </Avatar>
                                                <span>{emp.name}</span>
                                            </div>
                                        }
                                    >
                                        <div className="flex items-center gap-2">
                                            <Avatar src={emp.img} size="small">
                                                {emp.name?.[0]}
                                            </Avatar>
                                            <span>{emp.name}</span>
                                        </div>
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>

                        <div className="p-2 text-center border-r">
                            <Select
                                className="w-full"
                                value={booking.status}
                                onChange={(value) =>
                                    handleStatusChange(booking._id, value)
                                }
                                disabled={isCompleted}
                            >
                                <Select.Option value="pending">Pending</Select.Option>
                                <Select.Option value="completed">Completed</Select.Option>
                                <Select.Option value="canceled">Canceled</Select.Option>
                            </Select>
                        </div>

                        <div className="p-2 text-center">
                            <Button danger onClick={() => handleDelete(booking._id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default BookingTable
