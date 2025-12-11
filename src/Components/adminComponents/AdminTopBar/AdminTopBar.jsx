
const AdminTopBar = () => {
    return (
        <div className="py-4 sticky top-0">
            <div className="flex items-center justify-around w-full">
                <div className="flex flex-col items-center justify-center ">
                    <p className="text-[56px] font-bold">16</p>
                    <span className="text-[20px]">Employees</span>
                </div>
                <div className="w-[2px] h-40 bg-[#dadada]"></div>
                <div className="flex flex-col items-center justify-center ">
                    <p className="text-[56px] font-bold">12</p>
                    <span className="text-[20px]">Bookings</span>
                </div>
            </div>
        </div>
    )
}

export default AdminTopBar