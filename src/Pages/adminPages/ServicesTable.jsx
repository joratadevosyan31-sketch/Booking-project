import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Input, Select, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  fetchGetServicesData,
  fetchCreateService,
  fetchUpdateService,
  fetchDeleteService,
  fetchCreateSubService,
  fetchUpdateSubService,
  fetchDeleteSubService,
} from "../../store/slice/ServicesDataState/ServicesApi";

const ServicesTable = () => {
  const dispatch = useDispatch();
  const { servicesData, isLoading } = useSelector(
    (state) => state.servicesData
  );

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isSubServiceModalOpen, setIsSubServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingSubService, setEditingSubService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({ name: "" });
  const [subServiceFormData, setSubServiceFormData] = useState({
    name: "",
    duration: "",
    price: "",
  });

  useEffect(() => {
    dispatch(fetchGetServicesData());
  }, [dispatch]);

  const handleCreateService = () => {
    setEditingService(null);
    setServiceFormData({ name: "" });
    setIsServiceModalOpen(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceFormData({ name: service.name });
    setIsServiceModalOpen(true);
  };

  const handleSubmitService = () => {
    if (!serviceFormData.name.trim()) {
      return;
    }

    if (editingService) {
      dispatch(
        fetchUpdateService({
          serviceId: editingService._id,
          ...serviceFormData,
        })
      ).then(() => {
        dispatch(fetchGetServicesData());
        setIsServiceModalOpen(false);
        setEditingService(null);
      });
    } else {
      dispatch(fetchCreateService(serviceFormData)).then(() => {
        dispatch(fetchGetServicesData());
        setIsServiceModalOpen(false);
      });
    }
  };

  const handleDeleteService = (serviceId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this service?",
      content: "This will also delete all associated sub-services.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(fetchDeleteService(serviceId)).then(() => {
          dispatch(fetchGetServicesData());
        });
      },
    });
  };

  const handleCreateSubService = (serviceId) => {
    setSelectedServiceId(serviceId);
    setEditingSubService(null);
    setSubServiceFormData({ name: "", duration: "", price: "" });
    setIsSubServiceModalOpen(true);
  };

  const handleEditSubService = (subService, serviceId) => {
    setSelectedServiceId(serviceId);
    setEditingSubService(subService);
    setSubServiceFormData({
      name: subService.name,
      duration: subService.duration.toString(),
      price: subService.price.toString(),
    });
    setIsSubServiceModalOpen(true);
  };

  const handleSubmitSubService = () => {
    if (
      !subServiceFormData.name.trim() ||
      !subServiceFormData.duration ||
      !subServiceFormData.price
    ) {
      return;
    }

    if (editingSubService) {
      dispatch(
        fetchUpdateSubService({
          subServiceId: editingSubService._id,
          name: subServiceFormData.name,
          duration: parseInt(subServiceFormData.duration),
          price: parseFloat(subServiceFormData.price),
        })
      ).then(() => {
        dispatch(fetchGetServicesData());
        setIsSubServiceModalOpen(false);
        setEditingSubService(null);
      });
    } else {
      dispatch(
        fetchCreateSubService({
          serviceId: selectedServiceId,
          name: subServiceFormData.name,
          duration: parseInt(subServiceFormData.duration),
          price: parseFloat(subServiceFormData.price),
        })
      ).then(() => {
        dispatch(fetchGetServicesData());
        setIsSubServiceModalOpen(false);
      });
    }
  };

  const handleDeleteSubService = (subServiceId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this sub-service?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(fetchDeleteSubService(subServiceId)).then(() => {
          dispatch(fetchGetServicesData());
        });
      },
    });
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
        <h2 className="text-[36px] font-bold text-gray-800">
          Services Management
        </h2>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleCreateService}
          className="bg-slate-600 hover:bg-slate-700 border-none rounded-[12px] px-6 py-2 h-auto text-[18px]"
        >
          Add Service
        </Button>
      </div>

      <div className="border border-gray-300 rounded-[12px] overflow-hidden bg-white shadow-sm">
        {servicesData && servicesData.length > 0 ? (
          servicesData.map((service, index) => (
            <div
              key={service._id || index}
              className={`border-b border-gray-200 ${
                index === 0 ? "border-t-0" : ""
              } hover:bg-gray-50 transition-colors`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[24px] font-bold text-gray-800">
                      {service.name}
                    </h3>
                    {service.subServices && service.subServices.length > 0 && (
                      <Tag
                        color="blue"
                        className="text-[14px] px-3 py-1 rounded-full"
                      >
                        {service.subServices.length} Sub-service
                        {service.subServices.length !== 1 ? "s" : ""}
                      </Tag>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => handleCreateSubService(service._id)}
                      className="rounded-[8px] border-slate-600 text-slate-600 hover:bg-slate-50"
                    >
                      Add Sub-service
                    </Button>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => handleEditService(service)}
                      className="rounded-[8px] border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteService(service._id)}
                      className="rounded-[8px]"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {service.subServices && service.subServices.length > 0 ? (
                  <div className="ml-4 border-l-2 border-gray-200 pl-6 space-y-3">
                    {service.subServices.map((subService, subIndex) => (
                      <div
                        key={subService._id || subIndex}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-[8px] hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <span className="text-[18px] font-semibold text-gray-800">
                              {subService.name}
                            </span>
                            <Tag
                              color="green"
                              className="text-[14px] px-2 py-1 rounded"
                            >
                              {subService.duration} min
                            </Tag>
                            <Tag
                              color="orange"
                              className="text-[14px] px-2 py-1 rounded"
                            >
                              ${subService.price}
                            </Tag>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() =>
                              handleEditSubService(subService, service._id)
                            }
                            className="rounded-[6px] border-blue-600 text-blue-600 hover:bg-blue-50"
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() =>
                              handleDeleteSubService(subService._id)
                            }
                            className="rounded-[6px]"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="ml-4 text-gray-500 text-[16px] italic">
                    No sub-services yet
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center">
            <p className="text-[20px] text-gray-500">
              No services found. Create your first service!
            </p>
          </div>
        )}
      </div>

      {/* Service Modal */}
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

      {/* Sub-Service Modal */}
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
    </div>
  );
};

export default ServicesTable;
