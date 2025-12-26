import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { fetchGetSalonData, fetchPatchSalonData, } from "../../store/slice/SalonDataState/SalonApi";
import StatisticChart from "./StatisticChart";

const SalonPage = () => {
    const dispatch = useDispatch();
    const { salonData, isLoading } = useSelector((state) => state.salonData);
    const previousSalonDataRef = useRef(null);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (!salonData || salonData.length === 0) {
            dispatch(fetchGetSalonData());
            return;
        }

        const salonDataString = JSON.stringify(salonData);
        const previousSalonDataString = previousSalonDataRef.current
            ? JSON.stringify(previousSalonDataRef.current)
            : null;

        if (
            salonDataString !== previousSalonDataString &&
            !isEditing &&
            Object.keys(salonData).length > 0
        ) {
            setFormData(salonData);
            setHasChanges(false);
            previousSalonDataRef.current = salonData;
        }
    }, [dispatch, salonData, isEditing]);

    const handleChange = (key, value) => {
        const updated = {
            ...formData,
            [key]: value,
        };

        setFormData(updated);

        const changed = Object.keys(updated).some(
            (k) => updated[k] !== salonData[k]
        );

        setHasChanges(changed);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setHasChanges(false);
    };

    const handleCancel = () => {
        setFormData(salonData);
        setIsEditing(false);
        setHasChanges(false);
    };

    const handleUpdate = () => {
        if (!hasChanges) return;

        dispatch(fetchPatchSalonData(formData));
        setIsEditing(false);
        setHasChanges(false);
    };

    const renderCell = (key, label) => {
        if (isEditing) {
            return (
                <input
                    value={formData[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full text-center border-2 border-blue-300 rounded-[8px] px-3 py-2 focus:outline-none focus:border-blue-500 text-[14px]"
                    placeholder={`Enter ${label.toLowerCase()}`}
                />
            );
        }
        return (
            <p className="text-[16px] font-medium text-gray-800">
                {formData[key] || "-"}
            </p>
        );
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
                <h2 className="text-[36px] font-bold text-gray-800">Salon Management</h2>
                {!isEditing ? (
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={handleEdit}
                        className="bg-slate-600 hover:bg-slate-700 border-none rounded-[12px] px-6 py-2 h-auto text-[16px]"
                    >
                        Edit Settings
                    </Button>
                ) : (
                    <div className="flex gap-3">
                        <Button
                            icon={<CloseOutlined />}
                            onClick={handleCancel}
                            className="rounded-[12px] px-6 py-2 h-auto text-[16px]"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            onClick={handleUpdate}
                            disabled={!hasChanges}
                            className={`rounded-[12px] px-6 py-2 h-auto text-[16px] ${hasChanges ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"} border-none`}
                        >
                            Save Changes
                        </Button>
                    </div>
                )}
            </div>

            <div className="border border-gray-300 rounded-[12px] overflow-hidden bg-white shadow-sm">
                <div className="grid grid-cols-7 bg-gray-100 text-gray-700 font-semibold">
                    <div className="text-center p-4 border-r">Name</div>
                    <div className="text-center p-4 border-r">Address</div>
                    <div className="text-center p-4 border-r">Work Start</div>
                    <div className="text-center p-4 border-r">Work End</div>
                    <div className="text-center p-4 border-r">Break Start</div>
                    <div className="text-center p-4 border-r">Break End</div>
                    <div className="text-center p-4 border-r">Break Between (min)</div>
                    {/* <div className="text-center p-4">
                        {isEditing && (
                            <span className="text-blue-600 text-[14px]">Editing Mode</span>
                        )}
                    </div> */}
                </div>

                <div className="grid grid-cols-7 items-center text-gray-600 border-t border-gray-200">
                    <div className="text-center p-4 border-r">
                        {renderCell("name", "Name")}
                    </div>
                    <div className="text-center p-4 border-r">
                        {renderCell("address", "Address")}
                    </div>
                    <div className="text-center p-4 border-r  text-blue-600">
                        {renderCell("workStart", "Work Start")}
                    </div>
                    <div className="text-center p-4 border-r  text-blue-600">
                        {renderCell("workEnd", "Work End")}
                    </div>
                    <div className="text-center p-4 border-r">
                        {renderCell("mainBreakStart", "Break Start")}
                    </div>
                    <div className="text-center p-4 border-r">
                        {renderCell("mainBreakEnd", "Break End")}
                    </div>
                    <div className="text-center p-4 border-r">
                        {renderCell("defaultBreakBetweenServices", "Break Between")}
                    </div>
                    {/* <div className="text-center p-4">
                        {hasChanges && isEditing && (
                            <span className="text-orange-500 text-[14px] font-semibold">
                                Unsaved changes
                            </span>
                        )}
                    </div> */}
                </div>
            </div>
            <StatisticChart />
        </div>
    );
};

export default SalonPage;
