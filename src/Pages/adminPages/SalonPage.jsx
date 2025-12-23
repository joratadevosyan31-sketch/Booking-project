import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetEmployeesData } from '../../store/slice/EmployeesDataState/EmployeeApi'
import { fetchGetSalonData } from '../../store/slice/SalonDataState/SalonApi'

const SalonPage = () => {

    const dispatch = useDispatch()
    const { salonData } = useSelector(state => state.salonData)

    useEffect(() => {
        if (!salonData || salonData.length === 0) {
            dispatch(fetchGetSalonData())
        }
    }, [dispatch])

    console.log(salonData);

    return (
        <div className="w-full border border-gray-300 rounded overflow-hidden">

            <div className="grid grid-cols-8 items-center bg-gray-100 text-gray-700 font-semibold">
                <div className="text-center px-4 py-2 border-r border-gray-300">Name</div>
                <div className="text-center px-4 py-2 border-r border-gray-300">Address</div>
                <div className="text-center px-4 py-2 border-r border-gray-300">Work Start</div>
                <div className="text-center px-4 py-2 border-r border-gray-300">Work End</div>
                <div className="text-center px-4 py-2 border-r border-gray-300">Break Start</div>
                <div className="text-center px-4 py-2 border-r border-gray-300">Break End</div>
                <div className="text-center px-4 py-2  border-gray-300">Break Between Services</div>
                <div className="text-center px-4 py-2 border-l border-gray-300">Action</div>
            </div>

            <div className='grid grid-cols-8 items-center bg-gray-100 text-gray-700 font-medium'></div>
        </div>

    )
}

export default SalonPage