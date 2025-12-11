
const NewEmployeeForm = () => {

    return (
        <table>
            <tbody>
                <tr>
                    <td className="py-2 px-4 border">
                        <input
                            type="text"
                            // value={editData.name}
                            // onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="border px-2 py-1 w-full"
                        />
                    </td>

                    <td className="py-2 px-4 border">
                        <input
                            type="text"
                            // value={editData.workStart}
                            // onChange={(e) => setEditData({ ...editData, workStart: e.target.value })}
                            className="border px-2 py-1 w-full"
                        />
                    </td>

                    <td className="py-2 px-4 border">
                        <input
                            type="text"
                            // value={editData.workEnd}
                            // onChange={(e) => setEditData({ ...editData, workEnd: e.target.value })}
                            className="border px-2 py-1 w-full"
                        />
                    </td>

                    <td className="py-2 px-4 border">
                        <input
                            type="text"
                            // value={editData.mainBreakStart}
                            // onChange={(e) => setEditData({ ...editData, mainBreakStart: e.target.value })}
                            className="border px-2 py-1 w-full"
                        />
                    </td>

                    <td className="py-2 px-4 border">
                        <input
                            type="text"
                            // value={editData.mainBreakEnd}
                            // onChange={(e) => setEditData({ ...editData, mainBreakEnd: e.target.value })}
                            className="border px-2 py-1 w-full"
                        />
                    </td>

                    <td className="py-2 px-4 border">
                        <input
                            type="number"
                            // value={editData.defaultBreakBetweenServices}
                            // onChange={(e) =>
                            //     setEditData({ ...editData, defaultBreakBetweenServices: e.target.value })
                            // }
                            className="border px-2 py-1 w-full"
                        />
                    </td>

                    <td className="py-2 px-4 border flex gap-2">
                        <button
                            // onClick={() => handleSave(emp._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                            Add
                        </button>
                        <button
                            // onClick={handleCancel}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default NewEmployeeForm