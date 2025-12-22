import React, { use } from 'react'
import { useSelector } from 'react-redux'

const SalonPage = () => {

    const { employeesData } = useSelector(state => state.employeesData)

    return (
        <div className="w-full border border-gray-300 rounded overflow-hidden">

            <div className="flex bg-gray-100 text-gray-700 font-semibold">
                {
                    employeesData.map((emp, ind) => {
                        Object.keys(booking).forEach(key => (
                            <div className="w-[200px] px-4 py-2 border-r border-gray-300">{key}</div>
                        )
                        )
                    })
                }
                <div className="w-[150px] px-4 py-2 border-r border-gray-300">Role</div>
                <div className="w-[150px] px-4 py-2">Actions</div>
            </div>

            {/* Add new row */}
            <div className="flex bg-gray-50 items-center border-t border-gray-300">
                <div className="w-[200px] px-4 py-2 border-r border-gray-300">
                    <input type="text" placeholder="New Name" className="w-full border rounded px-2 py-1" />
                </div>
                <div className="w-[150px] px-4 py-2 border-r border-gray-300">
                    <input type="text" placeholder="Role" className="w-full border rounded px-2 py-1" />
                </div>
                <div className="w-[150px] px-4 py-2">
                    <button className="bg-[rgb(71,85,105)] text-white px-4 py-1 rounded">Add</button>
                </div>
            </div>

            {/* Data rows */}
            <div className="flex items-center border-t border-gray-200 bg-white hover:bg-gray-50">
                <div className="w-[200px] px-4 py-2 border-r border-gray-300">John Doe</div>
                <div className="w-[150px] px-4 py-2 border-r border-gray-300">Manager</div>
                <div className="w-[150px] px-4 py-2 flex gap-2">
                    <button className="bg-[rgb(71,85,105)] text-white px-3 py-1 rounded">Edit</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
            </div>

            <div className="flex items-center border-t border-gray-200 bg-white hover:bg-gray-50">
                <div className="w-[200px] px-4 py-2 border-r border-gray-300">Jane Smith</div>
                <div className="w-[150px] px-4 py-2 border-r border-gray-300">Stylist</div>
                <div className="w-[150px] px-4 py-2 flex gap-2">
                    <button className="bg-[rgb(71,85,105)] text-white px-3 py-1 rounded">Edit</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
            </div>

            {/* Repeat data rows as needed */}
        </div>

    )
}

export default SalonPage