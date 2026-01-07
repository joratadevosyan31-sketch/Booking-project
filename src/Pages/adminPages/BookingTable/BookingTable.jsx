import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Button, Avatar, Tag, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import NoBookingFound from "./Components/NoBookingFound";
import BookingTableHeader from "./Components/BookingTableHeader";
import IsLoading from "../../../Components/IsLoading";
import {
  fetchDeleteBooking,
  fetchGetBookings,
  fetchPatchBooking,
} from "../../../store/slice/BookingsDataState/BookingsDataApi";
import { fetchGetBookingAvailability } from "../../../store/slice/BookingAvailabilityDataState/BookingAvailabilityDataApi";

const BookingTable = () => {
  const dispatch = useDispatch();

  const { bookingsData, isLoading } = useSelector((state) => state.bookingsData);
  const { availableEmployees, availableSubServices } = useSelector(
    (state) => state.bookingAvailabilities
  );

  useEffect(() => {
    if (!bookingsData || bookingsData.length === 0) {
      dispatch(fetchGetBookings());
    }
  }, [dispatch, bookingsData]);

  const handleChange = (bookingId, data) => {
    dispatch(fetchPatchBooking({ id: bookingId, data }));
  };

  const handleDelete = (bookingId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this booking?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => dispatch(fetchDeleteBooking(bookingId)),
    });
  };

  const fetchAvailability = (booking) => {
    dispatch(
      fetchGetBookingAvailability({
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        serviceId: booking.service?._id,
        bookingId: booking._id,
      })
    );
  };

  if (isLoading) return <IsLoading />;

  const renderSubServiceSelect = (booking, isDisabled) => (
    <Select
      mode="multiple"
      allowClear
      className="w-full"
      value={booking.subServices?.map((s) => s.name) || []}
      onChange={(selectedNames) => {
        const updatedSubServices = availableSubServices.filter((sub) =>
          selectedNames.includes(sub.name)
        );
        handleChange(booking._id, { subServices: updatedSubServices });
      }}
      disabled={isDisabled}
      placeholder="Select sub-services"
    >
      {availableSubServices.map((sub) => (
        <Select.Option key={sub._id} value={sub.name}>
          {sub.name}
        </Select.Option>
      ))}
    </Select>
  );

  const renderEmployeeSelect = (booking, isDisabled) => (
    <Select
      className="w-full"
      value={booking.employee?._id}
      onChange={(employeeId) => {
        const selectedEmployee = availableEmployees.find((emp) => emp._id === employeeId);
        handleChange(booking._id, { employee: selectedEmployee });
      }}
      disabled={isDisabled}
      placeholder="Select employee"
      optionLabelProp="label"
    >
      {availableEmployees.map((emp) => (
        <Select.Option
          key={emp._id}
          value={emp._id}
          label={
            <div className="flex items-center gap-2">
              <Avatar src={emp.img} size="small">{emp.name?.[0]}</Avatar>
              <span>{emp.name}</span>
            </div>
          }
        >
          <div className="flex items-center gap-2">
            <Avatar src={emp.img} size="small">{emp.name?.[0]}</Avatar>
            <span>{emp.name}</span>
          </div>
        </Select.Option>
      ))}
    </Select>
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[36px] font-bold text-gray-800">Bookings Management</h2>
      </div>

      <div className="border border-gray-300 rounded-[12px] overflow-hidden bg-white shadow-sm">
        <BookingTableHeader />

        {bookingsData && bookingsData.length > 0 ? (
          bookingsData.map((booking, index) => {
            const isDisabled = booking.status === "completed" || booking.status === "canceled";

            return (
              <div
                key={booking._id}
                className={`grid grid-cols-8 border-t border-gray-200 items-center text-gray-600 hover:bg-gray-50 transition-colors ${isDisabled
                  ? "opacity-70 bg-gray-50"
                  : index % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                  }`}
                onClick={() => fetchAvailability(booking)}
              >
                <div className="p-4 text-center border-r">
                  <p className="text-[14px] font-medium text-gray-800">
                    {booking.customer?.phone || "Guest"}
                  </p>
                </div>

                <div className="p-4 text-center border-r">
                  {renderSubServiceSelect(booking, isDisabled)}
                </div>

                <div className="p-4 text-center border-r">
                  <p className="text-[14px] font-semibold text-blue-600">{booking.startTime}</p>
                </div>

                <div className="p-4 text-center border-r">
                  <p className="text-[14px] font-semibold text-blue-600">{booking.endTime}</p>
                </div>

                <div className="p-4 text-center border-r">
                  <p className="text-[14px] text-gray-700">
                    {booking.date ? new Date(booking.date).toLocaleDateString() : "-"}
                  </p>
                </div>

                <div className="p-4 text-center border-r">
                  {renderEmployeeSelect(booking, isDisabled)}
                </div>

                <div className="p-4 text-center border-r">
                  <Select
                    className="w-full"
                    value={booking.status}
                    onChange={(status) => handleChange(booking._id, { status })}
                    disabled={isDisabled}
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
                    disabled={isDisabled}
                    className="rounded-[8px]"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <NoBookingFound />
        )}
      </div>
    </div>
  );
};

export default BookingTable;
