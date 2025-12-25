import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Avatar, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  fetchDeleteEmployee,
  fetchGetEmployeesData,
} from "../../store/slice/EmployeesDataState/EmployeeApi";
import NewEmployeeForm from "./NewEmployeeForm";

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const { employeesData, isLoading } = useSelector(
    (state) => state.employeesData
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchGetEmployeesData());
  }, [dispatch]);

  const handleCreate = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDelete = (employeeId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this employee?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(fetchDeleteEmployee(employeeId));
      },
    });
  };

  const handleFormSuccess = () => {
    dispatch(fetchGetEmployeesData());
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
          Employees Management
        </h2>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          className="bg-slate-600 hover:bg-slate-700 border-none rounded-[12px] px-6 py-2 h-auto text-[18px]"
        >
          Add Employee
        </Button>
      </div>

      <div className="border border-gray-300 rounded-[12px] overflow-hidden bg-white shadow-sm">
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

        {employeesData && employeesData.length > 0 ? (
          employeesData.map((emp, ind) => (
            <div
              key={emp._id || ind}
              className={`grid grid-cols-9 border-t border-gray-200 text-gray-600 items-center hover:bg-gray-50 transition-colors ${
                ind % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="p-4 flex items-center justify-center border-r">
                <Avatar
                  src={emp.img}
                  size={64}
                  className="rounded-full border-2 border-gray-200"
                >
                  {emp?.name?.[0]?.toUpperCase() || "?"}
                </Avatar>
              </div>
              <div className="p-4 text-center border-r">
                <p className="text-[16px] font-semibold text-gray-800">
                  {emp?.name || "-"}
                </p>
              </div>
              <div className="p-4 text-center border-r">
                <p className="text-[14px] text-gray-600">
                  {emp?.profession || "-"}
                </p>
              </div>
              <div className="p-4 text-center border-r">
                <div className="flex flex-wrap gap-1 justify-center">
                  {emp.services && emp.services.length > 0 ? (
                    emp.services.slice(0, 2).map((s, idx) => (
                      <Tag
                        key={idx}
                        color="blue"
                        className="text-[12px] px-2 py-1 rounded"
                      >
                        {s.name}
                      </Tag>
                    ))
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                  {emp.services && emp.services.length > 2 && (
                    <Tag
                      color="default"
                      className="text-[12px] px-2 py-1 rounded"
                    >
                      +{emp.services.length - 2}
                    </Tag>
                  )}
                </div>
              </div>
              <div className="p-4 text-center border-r">
                <p className="text-[14px]">{emp.mainBreakStart || "-"}</p>
              </div>
              <div className="p-4 text-center border-r">
                <p className="text-[14px]">{emp.mainBreakEnd || "-"}</p>
              </div>
              <div className="p-4 text-center border-r">
                <p className="text-[14px] font-semibold text-gray-800">
                  {emp.workStart || "-"}
                </p>
              </div>
              <div className="p-4 text-center border-r">
                <p className="text-[14px] font-semibold text-gray-800">
                  {emp.workEnd || "-"}
                </p>
              </div>
              <div className="p-4 text-center flex items-center justify-center gap-2">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(emp)}
                  className="rounded-[8px] border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Edit
                </Button>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(emp._id)}
                  className="rounded-[8px]"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center">
            <p className="text-[20px] text-gray-500">
              No employees found. Create your first employee!
            </p>
          </div>
        )}
      </div>

      <NewEmployeeForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEmployee(null);
        }}
        editingEmployee={editingEmployee}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};

export default EmployeeTable;
