import { Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetEmployeeByService, fetchGetEmployeesData } from "../../../../../store/slice/EmployeesDataState/EmployeeApi";
import { setProfessional } from "../../../../../store/slice/BookingCardDataState/BookingCardDataSlice";

const ChangeProfessional = () => {

    const dispatch = useDispatch()

    const { employeebyService } = useSelector(state => state.employeesData)
    const { subServices, employee } = useSelector(state => state.bookingCardData)

    useEffect(() => {
        dispatch(fetchGetEmployeeByService({
            serviceId: subServices[0].service
        }))
    }, [dispatch])

    const options = employeebyService?.map((emp) => ({
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
        const selectedEmp = employeebyService.find(emp => emp._id === empId);
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