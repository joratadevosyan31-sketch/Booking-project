

const SubServiceModal = ({ }) => {
    return (
        <Modal
            title={
                editingSubService ? "Edit Sub-Service" : "Create New Sub-Service"
            }
            open={isSubServiceModalOpen}
            onOk={handleSubmitSubService}
            onCancel={() => {
                setIsSubServiceModalOpen(false);
                setEditingSubService(null);
                setSubServiceFormData({ name: "", duration: "", price: "" });
            }}
            okText={editingSubService ? "Update" : "Create"}
            okButtonProps={{
                className:
                    "bg-slate-600 hover:bg-slate-700 border-none rounded-[8px]",
            }}
            cancelButtonProps={{ className: "rounded-[8px]" }}
            className="rounded-[12px]"
        >
            <div className="py-4 space-y-4">
                <div>
                    <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                        Sub-Service Name
                    </label>
                    <Input
                        value={subServiceFormData.name}
                        onChange={(e) =>
                            setSubServiceFormData({
                                ...subServiceFormData,
                                name: e.target.value,
                            })
                        }
                        placeholder="Enter sub-service name"
                        className="rounded-[8px] text-[16px] py-2"
                    />
                </div>
                <div>
                    <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                        Duration (minutes)
                    </label>
                    <Input
                        type="number"
                        value={subServiceFormData.duration}
                        onChange={(e) =>
                            setSubServiceFormData({
                                ...subServiceFormData,
                                duration: e.target.value,
                            })
                        }
                        placeholder="Enter duration in minutes"
                        className="rounded-[8px] text-[16px] py-2"
                    />
                </div>
                <div>
                    <label className="block text-[16px] font-semibold text-gray-700 mb-2">
                        Price ($)
                    </label>
                    <Input
                        type="number"
                        step="0.01"
                        value={subServiceFormData.price}
                        onChange={(e) =>
                            setSubServiceFormData({
                                ...subServiceFormData,
                                price: e.target.value,
                            })
                        }
                        placeholder="Enter price"
                        className="rounded-[8px] text-[16px] py-2"
                    />
                </div>
            </div>
        </Modal>
    )
}

export default SubServiceModal