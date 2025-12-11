import { useState, useEffect } from "react";

const ServicesTable = () => {

    const [services, setServices] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    // useEffect(() => {
    //     const fetchServices = async () => {
    //         try {
    //             const res = await axios.get("/api/services"); // backend endpoint
    //             setServices(res.data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetchServices();
    // }, []);

    const handleEdit = (service) => {
        setEditingId(service._id);
        setEditData({
            name: service.name,
            duration: service.duration,
            price: service.price,
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    // const handleSave = async (id) => {
    //     try {
    //         await axios.put(`/api/services/${id}`, editData);
    //         setServices(services.map(s => s._id === id ? { ...s, ...editData } : s));
    //         handleCancel();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`/api/services/${id}`);
    //         setServices(services.filter(s => s._id !== id));
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Duration</th>
                        <th className="py-2 px-4 border">Price (AMD)</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {services.map(service => (
                        <tr key={service._id}>
                            <td className="py-2 px-4 border">
                                {editingId === service._id ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={e => setEditData({ ...editData, name: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    service.name
                                )}
                            </td>
                            <td className="py-2 px-4 border">
                                {editingId === service._id ? (
                                    <input
                                        type="number"
                                        value={editData.duration}
                                        onChange={e => setEditData({ ...editData, duration: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    service.duration
                                )}
                            </td>
                            <td className="py-2 px-4 border">
                                {editingId === service._id ? (
                                    <input
                                        type="number"
                                        value={editData.price}
                                        onChange={e => setEditData({ ...editData, price: e.target.value })}
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    service.price
                                )}
                            </td>
                            <td className="py-2 px-4 border flex gap-2">
                                {editingId === service._id ? (
                                    <>
                                        <button onClick={() => handleSave(service._id)} className="bg-green-500 text-white px-3 py-1 rounded">
                                            Save
                                        </button>
                                        <button onClick={handleCancel} className="bg-gray-500 text-white px-3 py-1 rounded">
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(service)} className="bg-blue-500 text-white px-3 py-1 rounded">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(service._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    );
};

export default ServicesTable;
