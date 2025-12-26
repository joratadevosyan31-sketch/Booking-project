import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetServicesData } from "../../../../store/slice/ServicesDataState/ServicesApi";
import {
    fetchCreateEmployee,
    fetchUpdateEmployee,
} from "../../../../store/slice/EmployeesDataState/EmployeeApi";

const NewEmployeeForm = ({
    isOpen,
    onClose,
    editingEmployee = null,
    onSuccess,
}) => {
    const dispatch = useDispatch();
    const { servicesData } = useSelector((state) => state.servicesData);

    const [formData, setFormData] = useState({
        name: "",
        profession: "",
        img: "",
        services: [],
        subServices: [],
        workStart: "",
        workEnd: "",
        mainBreakStart: "",
        mainBreakEnd: "",
        defaultBreakBetweenServices: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchGetServicesData());
    }, [dispatch]);

    useEffect(() => {
        if (editingEmployee) {
            setFormData({
                name: editingEmployee.name || "",
                profession: editingEmployee.profession || "",
                img: editingEmployee.img || "",
                services: editingEmployee.services?.map((s) => s._id || s) || [],
                subServices: editingEmployee.subServices?.map((s) => s._id || s) || [],
                workStart: editingEmployee.workStart || "",
                workEnd: editingEmployee.workEnd || "",
                mainBreakStart: editingEmployee.mainBreakStart || "",
                mainBreakEnd: editingEmployee.mainBreakEnd || "",
                defaultBreakBetweenServices:
                    editingEmployee.defaultBreakBetweenServices?.toString() || "",
            });
        } else {
            setFormData({
                name: "",
                profession: "",
                img: "",
                services: [],
                subServices: [],
                workStart: "",
                workEnd: "",
                mainBreakStart: "",
                mainBreakEnd: "",
                defaultBreakBetweenServices: "",
            });
        }
        setErrors({});
    }, [editingEmployee, isOpen]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!formData.profession.trim()) {
            newErrors.profession = "Profession is required";
        } else if (!formData.img.trim()) {
            newErrors.img = "Image URL is required";
        } else if (!formData.services.length) {
            newErrors.services = "At least one service is required";
        } else if (!formData.workStart) {
            newErrors.workStart = "Work start time is required";
        } else if (!formData.workEnd) {
            newErrors.workEnd = "Work end time is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const submitData = {
                ...formData,
                defaultBreakBetweenServices: formData.defaultBreakBetweenServices
                    ? parseInt(formData.defaultBreakBetweenServices)
                    : undefined,
            };

            if (editingEmployee) {
                await dispatch(
                    fetchUpdateEmployee({
                        employeeId: editingEmployee._id,
                        ...submitData,
                    })
                ).unwrap();
            } else {
                await dispatch(fetchCreateEmployee(submitData)).unwrap();
            }

            onSuccess?.();
            onClose();
        } catch (error) {
            console.error("Error saving employee:", error);
        } finally {
            setLoading(false);
        }
    };

    const getAvailableSubServices = () => {
        if (!formData.services.length) return [];

        const selectedServices = servicesData.filter((service) =>
            formData.services.includes(service._id)
        );

        const allSubServices = [];
        selectedServices.forEach((service) => {
            if (service.subServices) {
                service.subServices.forEach((sub) => {
                    if (!allSubServices.find((s) => s._id === sub._id)) {
                        allSubServices.push(sub);
                    }
                });
            }
        });

        return allSubServices;
    };

    return (
        <Modal
            title={editingEmployee ? "Edit Employee" : "Create New Employee"}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={700}
            className="rounded-[12px]"
        >
            <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                    <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter employee name"
                        className={`rounded-[8px] text-[16px] py-2 ${errors.name ? "border-red-500" : ""
                            }`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-[14px] mt-1">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                        Profession <span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={formData.profession}
                        onChange={(e) =>
                            setFormData({ ...formData, profession: e.target.value })
                        }
                        placeholder="Enter profession"
                        className={`rounded-[8px] text-[16px] py-2 ${errors.profession ? "border-red-500" : ""
                            }`}
                    />
                    {errors.profession && (
                        <p className="text-red-500 text-[14px] mt-1">{errors.profession}</p>
                    )}
                </div>

                <div>
                    <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                        Image URL <span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={formData.img}
                        onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                        placeholder="Enter image URL"
                        className={`rounded-[8px] text-[16px] py-2 ${errors.img ? "border-red-500" : ""
                            }`}
                    />
                    {errors.img && (
                        <p className="text-red-500 text-[14px] mt-1">{errors.img}</p>
                    )}
                </div>

                <div>
                    <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                        Services <span className="text-red-500">*</span>
                    </label>
                    <Select
                        mode="multiple"
                        value={formData.services}
                        onChange={(values) => {
                            setFormData({
                                ...formData,
                                services: values,
                                subServices: formData.subServices.filter((subId) =>
                                    getAvailableSubServices().some((sub) => sub._id === subId)
                                ),
                            });
                        }}
                        placeholder="Select services"
                        className="w-full rounded-[8px]"
                        options={servicesData.map((service) => ({
                            label: service.name,
                            value: service._id,
                        }))}
                    />
                    {errors.services && (
                        <p className="text-red-500 text-[14px] mt-1">{errors.services}</p>
                    )}
                </div>

                {formData.services.length > 0 && (
                    <div>
                        <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                            Sub-Services (Optional)
                        </label>
                        <Select
                            mode="multiple"
                            value={formData.subServices}
                            onChange={(values) =>
                                setFormData({ ...formData, subServices: values })
                            }
                            placeholder="Select sub-services"
                            className="w-full rounded-[8px]"
                            options={getAvailableSubServices().map((sub) => ({
                                label: `${sub.name} (${sub.duration}min - $${sub.price})`,
                                value: sub._id,
                            }))}
                        />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                            Work Start Time <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="time"
                            value={formData.workStart}
                            onChange={(e) =>
                                setFormData({ ...formData, workStart: e.target.value })
                            }
                            className={`rounded-[8px] text-[16px] py-2 ${errors.workStart ? "border-red-500" : ""
                                }`}
                        />
                        {errors.workStart && (
                            <p className="text-red-500 text-[14px] mt-1">
                                {errors.workStart}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                            Work End Time <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="time"
                            value={formData.workEnd}
                            onChange={(e) =>
                                setFormData({ ...formData, workEnd: e.target.value })
                            }
                            className={`rounded-[8px] text-[16px] py-2 ${errors.workEnd ? "border-red-500" : ""
                                }`}
                        />
                        {errors.workEnd && (
                            <p className="text-red-500 text-[14px] mt-1">{errors.workEnd}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                            Break Start Time
                        </label>
                        <Input
                            type="time"
                            value={formData.mainBreakStart}
                            onChange={(e) =>
                                setFormData({ ...formData, mainBreakStart: e.target.value })
                            }
                            className="rounded-[8px] text-[16px] py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                            Break End Time
                        </label>
                        <Input
                            type="time"
                            value={formData.mainBreakEnd}
                            onChange={(e) =>
                                setFormData({ ...formData, mainBreakEnd: e.target.value })
                            }
                            className="rounded-[8px] text-[16px] py-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                        Default Break Between Services (minutes)
                    </label>
                    <Input
                        type="number"
                        value={formData.defaultBreakBetweenServices}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                defaultBreakBetweenServices: e.target.value,
                            })
                        }
                        placeholder="Enter minutes"
                        className="rounded-[8px] text-[16px] py-2"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-4">
                <Button onClick={onClose} className="rounded-[8px] px-6">
                    Cancel
                </Button>
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}
                    className="bg-slate-600 hover:bg-slate-700 border-none rounded-[8px] px-6"
                >
                    {editingEmployee ? "Update" : "Create"}
                </Button>
            </div>
        </Modal>
    );
};

export default NewEmployeeForm;
