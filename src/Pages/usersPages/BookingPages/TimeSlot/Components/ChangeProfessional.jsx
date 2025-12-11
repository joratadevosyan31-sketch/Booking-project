import { Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetEmployeesData } from "../../../../../store/slice/EmployeesDataState/EmployeeApi";
import { setProfessional } from "../../../../../store/slice/BookingDataState/BookingDataSlice";

const ChangeProfessional = () => {


    const dispatch = useDispatch()

    const { employeesData } = useSelector(state => state.employeesData)
    const { selectedSubservice, professional } = useSelector(state => state.bookingData)

    useEffect(() => {
        if (!employeesData || employeesData.length === 0) {
            dispatch(fetchGetEmployeesData())
        }
    }, [dispatch])

    const matchedEmployee = employeesData.filter(emp =>
        emp.subServices.some(sub => sub._id === selectedSubservice._id)
    );

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
            defaultValue={professional._id}
            options={options}
            optionLabelProp="label"
        />
    );
};

export default ChangeProfessional