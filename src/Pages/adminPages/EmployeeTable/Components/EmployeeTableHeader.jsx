
const EmployeeTableHeader = () => {
    return (
        <div className="grid grid-cols-9 bg-gray-100 text-gray-700 font-semibold">
            <div className="p-4 text-center border-r">Image</div>
            <div className="p-4 text-center border-r">Name</div>
            <div className="p-4 text-center border-r">Profession</div>
            <div className="p-4 text-center border-r">Services</div>
            <div className="p-4 text-center border-r">Break Start</div>
            <div className="p-4 text-center border-r">Break End</div>
            <div className="p-4 text-center border-r">Work Start</div>
            <div className="p-4 text-center border-r">Work End</div>
            <div className="p-4 text-center">Actions</div>
        </div>
    )
}

export default EmployeeTableHeader