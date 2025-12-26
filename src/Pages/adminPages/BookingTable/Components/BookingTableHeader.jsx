
const BookingTableHeader = () => {
    return (
        <div className="grid grid-cols-8 bg-gray-100 text-gray-700 font-semibold">
            <div className="p-4 text-center border-r">Customer</div>
            {/* <div className="p-4 text-center border-r">Service</div> */}
            <div className="p-4 text-center border-r">Sub-Services</div>
            <div className="p-4 text-center border-r">Start</div>
            <div className="p-4 text-center border-r">End</div>
            <div className="p-4 text-center border-r">Date</div>
            <div className="p-4 text-center border-r">Employee</div>
            <div className="p-4 text-center border-r">Status</div>
            <div className="p-4 text-center">Actions</div>
        </div>
    )
}

export default BookingTableHeader