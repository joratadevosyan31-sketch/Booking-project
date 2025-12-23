import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetSalonData, fetchPatchSalonData } from '../../store/slice/SalonDataState/SalonApi'

const SalonPage = () => {
    const dispatch = useDispatch()

    const { salonData, isLoading } = useSelector(state => state.salonData)

    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({})
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        if (!salonData || salonData.length === 0) {
            dispatch(fetchGetSalonData())
        } else {
            setFormData(salonData)
            setHasChanges(false)
            setIsEditing(false)
        }
    }, [dispatch, salonData])

    const handleChange = (key, value) => {
        const updated = {
            ...formData,
            [key]: value
        }

        setFormData(updated)

        // detect changes
        const changed = Object.keys(updated).some(
            k => updated[k] !== salonData[k]
        )

        setHasChanges(changed)
    }

    const handleEdit = () => {
        setIsEditing(true)
        setHasChanges(false)
    }

    const handleUpdate = () => {
        if (!hasChanges) return

        dispatch(fetchPatchSalonData(formData))
        setIsEditing(false)
        setHasChanges(false)
    }

    const renderCell = (key) =>
        isEditing ? (
            <input
                value={formData[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full text-center border rounded px-1 border-none outline-none"
            />
        ) : (
            formData[key]
        )

    if (isLoading) return <p>Loading...</p>

    return (
        <div className="w-full border border-gray-300 rounded overflow-hidden">

            {/* Header */}
            <div className="grid grid-cols-8 bg-gray-100 text-gray-700 font-semibold">
                <div className="text-center p-2 border-r">Name</div>
                <div className="text-center p-2 border-r">Address</div>
                <div className="text-center p-2 border-r">Work Start</div>
                <div className="text-center p-2 border-r">Work End</div>
                <div className="text-center p-2 border-r">Break Start</div>
                <div className="text-center p-2 border-r">Break End</div>
                <div className="text-center p-2 border-r">Break Between</div>
                <div className="text-center p-2">Action</div>
            </div>

            {/* Row */}
            <div className="grid grid-cols-8 items-center text-gray-600">
                <div className="text-center p-2 border-r">{renderCell('name')}</div>
                <div className="text-center p-2 border-r">{renderCell('address')}</div>
                <div className="text-center p-2 border-r">{renderCell('workStart')}</div>
                <div className="text-center p-2 border-r">{renderCell('workEnd')}</div>
                <div className="text-center p-2 border-r">{renderCell('mainBreakStart')}</div>
                <div className="text-center p-2 border-r">{renderCell('mainBreakEnd')}</div>
                <div className="text-center p-2 border-r">
                    {renderCell('defaultBreakBetweenServices')}
                </div>

                <div className="text-center p-2 flex gap-2 justify-center">
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="px-3 py-1 bg-slate-600 text-white rounded"
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            disabled={!hasChanges}
                            onClick={handleUpdate}
                            className={`px-3 py-1 rounded text-white
                                ${hasChanges
                                    ? 'bg-green-600'
                                    : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Update
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SalonPage
