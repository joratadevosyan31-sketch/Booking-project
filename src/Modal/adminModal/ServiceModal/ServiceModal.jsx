import { Input, Modal } from 'antd';
import React from 'react'

const ServiceModal = ({ }) => {
    return (
        <Modal
            title={editingService ? "Edit Service" : "Create New Service"}
            open={isServiceModalOpen}
            onOk={handleSubmitService}
            onCancel={() => {
                setIsServiceModalOpen(false);
                setEditingService(null);
                setServiceFormData({ name: "" });
            }}
            okText={editingService ? "Update" : "Create"}
            okButtonProps={{
                className:
                    "bg-slate-600 hover:bg-slate-700 border-none rounded-[8px]",
            }}
            cancelButtonProps={{ className: "rounded-[8px]" }}
            className="rounded-[12px]"
        >
            <div className="py-4">
                <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                    Service Name
                </label>
                <Input
                    value={serviceFormData.name}
                    onChange={(e) => setServiceFormData({ name: e.target.value })}
                    placeholder="Enter service name"
                    className="rounded-[8px] text-[16px] py-2"
                    onPressEnter={handleSubmitService}
                />
            </div>
        </Modal>
    )
}

export default ServiceModal