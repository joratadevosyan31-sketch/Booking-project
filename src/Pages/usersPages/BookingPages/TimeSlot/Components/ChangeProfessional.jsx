import { Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetEmployeesData } from "../../../../../store/slice/EmployeesDataState/EmployeeApi";
import { setProfessional } from "../../../../../store/slice/BookingCardDataState/BookingCardDataSlice";

const ChangeProfessional = () => {


    const dispatch = useDispatch()

    const { employeesData } = useSelector(state => state.employeesData)
    const { subServices, employee } = useSelector(state => state.bookingCardData)

    useEffect(() => {
        if (!employeesData || employeesData.length === 0) {
            dispatch(fetchGetEmployeesData())
        }
    }, [dispatch])

    const matchedEmployee = employeesData.filter(emp => {
        if (!subServices || subServices.length === 0) {
            return false;
        }

        return subServices.every(selectedSub =>
            emp.subServices.some(empSub => empSub._id === selectedSub._id)
        );
    });

    const options = matchedEmployee?.map((emp) => ({
        value: emp._id,
        label: (
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 4 }}>
                <img
                    src={emp.img}
                    style={{ width: 25, height: 25, borderRadius: "50%" }}
                    alt={emp.name}
                />
                <p>{emp.name}</p>
            </div>
        ),
    }));


    const handleChangeProfessional = (empId) => {
        const selectedEmp = matchedEmployee.find(emp => emp._id === empId);
        dispatch(setProfessional(selectedEmp));
    };


    return (
        <Select
            onChange={handleChangeProfessional}
            style={{ width: 250 }}
            defaultValue={employee?._id}
            options={options}
            optionLabelProp="label"
        />
    );
};

export default ChangeProfessional