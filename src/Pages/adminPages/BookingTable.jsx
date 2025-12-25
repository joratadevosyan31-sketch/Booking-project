import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Button, Avatar, Tag, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { fetchGetEmployeesData } from "../../store/slice/EmployeesDataState/EmployeeApi";
import {
  fetchDeleteBooking,
  fetchGetBookings,
  fetchPatchBooking,
} from "../../store/slice/BookingsDataState/BookingsDataApi";

const BookingTable = () => {
  const dispatch = useDispatch();

  const { bookingsData, isLoading } = useSelector(
    (state) => state.bookingsData
  );
  const { employeesData } = useSelector((state) => state.employeesData);

  useEffect(() => {
    dispatch(fetchGetBookings());
    dispatch(fetchGetEmployeesData());
  }, [dispatch]);

  const handleStatusChange = (bookingId, status) => {
    dispatch(
      fetchPatchBooking({
        id: bookingId,
        data: { status },
      })
    );
  };

  const handleEmployeeChange = (bookingId, employeeId) => {
    const selectedEmployee = employeesData.find(
      (emp) => emp.name === employeeId
    );
    if (selectedEmployee) {
      dispatch(
        fetchPatchBooking({
          id: bookingId,
          data: { employee: selectedEmployee._id },
        })
      );
    }
  };

  const handleSubServicesChange = (bookingId, subServiceNames) => {
    dispatch(
      fetchPatchBooking({
        id: bookingId,
        data: { subServices: subServiceNames },
      })
    );
  };

  const handleDelete = (bookingId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this booking?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(fetchDeleteBooking(bookingId));
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[24px] text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[36px] font-bold text-gray-800">
          Bookings Management
        </h2>
      </div>

      <div className="border border-gray-300 rounded-[12px] overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-9 bg-gray-100 text-gray-700 font-semibold">
          <div className="p-4 text-center border-r">Customer</div>
          <div className="p-4 text-center border-r">Service</div>
          <div className="p-4 text-center border-r">Sub-Services</div>
          <div className="p-4 text-center border-r">Start</div>
          <div className="p-4 text-center border-r">End</div>
          <div className="p-4 text-center border-r">Date</div>
          <div className="p-4 text-center border-r">Employee</div>
          <div className="p-4 text-center border-r">Status</div>
          <div className="p-4 text-center">Actions</div>
        </div>

        {bookingsData && bookingsData.length > 0 ? (
          bookingsData.map((booking, ind) => {
            const isCompleted = booking.status === "completed";

            return (
              <div
                key={booking._id || ind}
                className={`grid grid-cols-9 border-t border-gray-200 items-center text-gray-600 hover:bg-gray-50 transition-colors ${
                  isCompleted
                    ? "opacity-70 bg-gray-50"
                    : ind % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                }`}
              >
                <div className="p-4 text-center border-r">
                  <p className="text-[14px] font-medium text-gray-800">
                    {booking.customer?.phone || "Guest"}
                  </p>
                </div>
                <div className="p-4 text-center border-r">
                  <p className="text-[14px] font-semibold text-gray-800">
                    {booking.service?.name || "-"}
                  </p>
                </div>
                <div className="p-4 text-center border-r">
                  <Select
                    mode="multiple"
                    allowClear
                    className="w-full rounded-[8px]"
                    value={booking.subServices?.map((s) => s.name)}
                    onChange={(values) =>
                      handleSubServicesChange(booking._id, values)
                    }
                    disabled={isCompleted}
                    placeholder="Select sub-services"
                  >
                    {booking.service?.subServices?.map((sub, idx) => (
                      <Select.Option key={sub._id || idx} value={sub.name}>
                        {sub.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="p-4 text-center border-r">
                  <p className="text-[14px] font-semibold text-blue-600">
                    {booking.startTime}
                  </p>
                </div>
                <div className="p-4 text-center border-r">
                  <p className="text-[14px] font-semibold text-blue-600">
                    {booking.endTime}
                  </p>
                </div>
                <div className="p-4 text-center border-r">
                  <p className="text-[14px] text-gray-700">
                    {booking.date
                      ? new Date(booking.date).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
                <div className="p-4 text-center border-r">
                  <Select
                    className="w-full rounded-[8px]"
                    value={booking.employee?.name}
                    onChange={(value) =>
                      handleEmployeeChange(booking._id, value)
                    }
                    disabled={isCompleted}
                    optionLabelProp="label"
                    placeholder="Select employee"
                  >
                    {employeesData.map((emp) => (
                      <Select.Option
                        key={emp._id}
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
                <div className="p-4 text-center border-r">
                  <Select
                    className="w-full rounded-[8px]"
                    value={booking.status}
                    onChange={(value) => handleStatusChange(booking._id, value)}
                    disabled={isCompleted}
                  >
                    <Select.Option value="pending">
                      <Tag color="orange">Pending</Tag>
                    </Select.Option>
                    <Select.Option value="completed">
                      <Tag color="green">Completed</Tag>
                    </Select.Option>
                    <Select.Option value="canceled">
                      <Tag color="red">Canceled</Tag>
                    </Select.Option>
                  </Select>
                </div>
                <div className="p-4 text-center">
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(booking._id)}
                    disabled={isCompleted}
                    className="rounded-[8px]"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center">
            <p className="text-[20px] text-gray-500">No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingTable;
