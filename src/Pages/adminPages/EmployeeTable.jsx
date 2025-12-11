import { useEffect, useState } from "react";
import NewEmployeeForm from "./NewEmployeeForm";

const AdminEmplyoyees = () => {

    const [employees, setEmployees] = useState([]);
    const [editingId, setEditingId] = useState(null); // current row being edited
    const [editData, setEditData] = useState({}); // temp state for edited row

    // useEffect(() => {
    //     const fetchEmployees = async () => {
    //         try {
    //             const res = await axios.get("/api/employees");
    //             setEmployees(res.data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetchEmployees();
    // }, []);

    // start editing a row

    const handleEdit = (emp) => {
        setEditingId(emp._id);
        setEditData({
            name: emp.name,
            workStart: emp.workStart,
            workEnd: emp.workEnd,
            mainBreakStart: emp.mainBreakStart || "",
            mainBreakEnd: emp.mainBreakEnd || "",
            defaultBreakBetweenServices: emp.defaultBreakBetweenServices || 0,
        });
    };

    // cancel editing
    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    // save changes
    // const handleSave = async (id) => {
    //     try {
    //         await axios.put(`/api/employees/${id}`, editData);
    //         setEmployees(employees.map(emp => emp._id === id ? { ...emp, ...editData } : emp));
    //         handleCancel();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // delete employee
    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`/api/employees/${id}`);
    //         setEmployees(employees.filter(emp => emp._id !== id));
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <div className="overflow-x-auto">
            <NewEmployeeForm />
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">Avatar</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Work Start</th>
                        <th className="py-2 px-4 border">Work End</th>
                        <th className="py-2 px-4 border">Break Start</th>
                        <th className="py-2 px-4 border">Break End</th>
                        <th className="py-2 px-4 border">Break Between Services</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>

                {/* <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id}>
                            <td className="py-2 px-4 border">
                                {editingId === emp._id ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    emp.name
                                )}
                            </td>

                            <td className="py-2 px-4 border">
                                {editingId === emp._id ? (
                                    <input
                                        type="text"
                                        value={editData.workStart}
                                        onChange={(e) => setEditData({ ...editData, workStart: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    emp.workStart
                                )}
                            </td>

                            <td className="py-2 px-4 border">
                                {editingId === emp._id ? (
                                    <input
                                        type="text"
                                        value={editData.workEnd}
                                        onChange={(e) => setEditData({ ...editData, workEnd: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    emp.workEnd
                                )}
                            </td>

                            <td className="py-2 px-4 border">
                                {editingId === emp._id ? (
                                    <input
                                        type="text"
                                        value={editData.mainBreakStart}
                                        onChange={(e) => setEditData({ ...editData, mainBreakStart: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    emp.mainBreakStart || "—"
                                )}
                            </td>

                            <td className="py-2 px-4 border">
                                {editingId === emp._id ? (
                                    <input
                                        type="text"
                                        value={editData.mainBreakEnd}
                                        onChange={(e) => setEditData({ ...editData, mainBreakEnd: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    emp.mainBreakEnd || "—"
                                )}
                            </td>

                            <td className="py-2 px-4 border">
                                {editingId === emp._id ? (
                                    <input
                                        type="number"
                                        value={editData.defaultBreakBetweenServices}
                                        onChange={(e) =>
                                            setEditData({ ...editData, defaultBreakBetweenServices: e.target.value })
                                        }
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    emp.defaultBreakBetweenServices || 0
                                )}
                            </td>

                            <td className="py-2 px-4 border flex gap-2">
                                {editingId === emp._id ? (
                                    <>
                                        <button
                                            onClick={() => handleSave(emp._id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="bg-gray-500 text-white px-3 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(emp)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(emp._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody> */}
            </table>
        </div>

    )
}

export default AdminEmplyoyees