// import Slider from "react-slick"
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { fetchGetServicesData } from "../../../../store/slice/ServicesDataState/ServicesApi";
// import { setProfessional, toggleSubservice, clearSelectedSubservices } from "../../../../store/slice/BookingCardDataState/BookingCardDataSlice";
// import PluseIcon from "../../../../Components/icons/PluseIcon";
// import CheckedIcon from "../../../../Components/icons/CheckedIcon";
// import { useSearchParams } from "react-router";
// import { fetchGetEmployeeById } from "../../../../store/slice/EmployeesDataState/EmployeeApi";

// const btnSettings = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     variableWidth: true,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     responsive: [
//         {
//             breakpoint: 1024,
//             settings: {
//                 slidesToShow: 4,
//                 slidesToScroll: 4,
//                 infinite: true,
//             }
//         },
//         {
//             breakpoint: 639,
//             settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 3,
//                 initialSlide: 3
//             }
//         },
//     ]
// };

// const SelectService = () => {

//     const dispatch = useDispatch();
//     const [employeeParams] = useSearchParams();
//     const employeeId = employeeParams.get("employeeId");

//     const { servicesData } = useSelector((state) => state.servicesData);
//     const { subServices } = useSelector((state) => state.bookingCardData);
//     const { employee } = useSelector((state) => state.employeesData);

//     const [selectedService, setSelectedService] = useState(null);
//     const [active, setActive] = useState(null);

//     useEffect(() => {
//         if (employeeId && !employee) {
//             dispatch(fetchGetEmployeeById(employeeId));
//         }
//     }, [dispatch, employeeId, employee]);

//     useEffect(() => {
//         if (!servicesData || servicesData.length === 0) {
//             dispatch(fetchGetServicesData());
//         }
//     }, [dispatch, servicesData]);

//     useEffect(() => {
//         if (servicesData && servicesData.length > 0 && subServices && subServices.length > 0) {
//             const firstSubservice = subServices[0];
//             const serviceId = firstSubservice.service || firstSubservice.service?._id;
//             const foundService = servicesData.find(ser => ser._id === serviceId);
//             if (foundService && !selectedService) {
//                 setSelectedService(foundService);
//                 setActive(serviceId);
//             }
//         } else if (servicesData && servicesData.length > 0 && !selectedService) {
//             setSelectedService(servicesData[0]);
//             setActive(servicesData[0]._id);
//         }
//     }, [servicesData, subServices, selectedService]);

//     const handleFilter = (service) => {
//         setSelectedService(service);
//         setActive(service._id);
//         if (subServices && subServices.length > 0) {
//             const firstSubservice = subServices[0];
//             const currentServiceId = firstSubservice.service || firstSubservice.service?._id;
//             if (currentServiceId !== service._id) {
//                 dispatch(clearSelectedSubservices());
//                 dispatch(setProfessional(null));
//             }
//         }
//     };

//     const handleSelectSubservice = (sub) => {
//         dispatch(toggleSubservice(sub));
//         const firstSubservice = subServices && subServices.length > 0 ? subServices[0] : null;
//         if (firstSubservice) {
//             const currentServiceId = firstSubservice.service || firstSubservice.service?._id;
//             const newServiceId = sub.service || sub.service?._id;
//             if (currentServiceId !== newServiceId) {
//                 dispatch(setProfessional(null));
//             }
//         } else {
//             dispatch(setProfessional(null));
//         }
//     };

//     return (
//         <div id="services">
//             <div className="container flex flex-col gap-6">

//                 {employeeId && employee ? (
//                     <div className="flex flex-col p-6 border rounded-lg  gap-4">
//                         <div className="flex items-center gap-4">
//                             <img
//                                 src={employee.img}
//                                 alt={employee.name}
//                                 className="w-16 h-16 rounded-full object-cover"
//                             />
//                             <p className="text-[24px] font-bold">{employee.name}</p>

//                         </div>

//                         <div className="m-auto px-6 w-full max-w-[1340px] btn-slider">
//                             <Slider {...btnSettings}>
//                                 {employee?.services?.map((ser, ind) => (
//                                     <button
//                                         onClick={() => handleFilter(ser)}
//                                         key={ind}
//                                         className={`px-4 py-2 rounded-full text-[24px] ${active === ser._id ? "bg-black text-white" : ""}`}
//                                     >
//                                         {ser.name}
//                                     </button>
//                                 ))}
//                             </Slider>
//                         </div>


//                         <div className="flex flex-col gap-4">
//                             {employee?.subServices?.map((sub, ind) => {
//                                 const isSelected = subServices && subServices.some(selected => selected._id === sub._id);
//                                 return (
//                                     <div
//                                         key={ind}
//                                         onClick={() => handleSelectSubservice(sub)}
//                                         className={`flex items-center justify-between bg-white py-[16px] px-6 border-[2px] rounded-[18px] hover:bg-gray-100 cursor-pointer ${isSelected ? 'border-purple-800' : 'border-gray'}`}
//                                     >
//                                         <div className="flex flex-col gap-3">
//                                             <p className={`text-[28px] font-medium`}>{sub.name}</p>
//                                             <p className={`text-[18px] text-gray}`}>{`${sub.duration} min`}</p>
//                                             <p className={`text-[24px] font-medium`}>{`${sub.price} AMD`}</p>
//                                         </div>
//                                         <div>
//                                             <button
//                                                 type="button"
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     handleSelectSubservice(sub);
//                                                 }}
//                                                 className={`p-3 rounded-[16px] border-[1px] ${isSelected ? 'bg-purple-800 border-white' : 'border-gray'}`}
//                                             >
//                                                 {isSelected ? <CheckedIcon /> : <PluseIcon />}
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 ) : (
//                     <>
//                         <div className="">
//                             <h2 className="text-[48px] font-bold">Services</h2>
//                         </div>

//                         <div className="m-auto px-6 w-full max-w-[1340px] btn-slider">
//                             <Slider {...btnSettings}>
//                                 {servicesData.map((ser, ind) => (
//                                     <button
//                                         onClick={() => handleFilter(ser)}
//                                         key={ind}
//                                         className={`px-4 py-2 rounded-full text-[24px] ${active === ser._id ? "bg-black text-white" : ""}`}
//                                     >
//                                         {ser.name}
//                                     </button>
//                                 ))}
//                             </Slider>
//                         </div>


//                         <div className="flex flex-col gap-4">
//                             {selectedService?.subServices?.map((sub, ind) => {
//                                 const isSelected = subServices && subServices.some(selected => selected._id === sub._id);
//                                 return (
//                                     <div
//                                         key={ind}
//                                         onClick={() => handleSelectSubservice(sub)}
//                                         className={`flex items-center justify-between bg-white py-[16px] px-6 border-[2px] rounded-[18px] hover:bg-gray-100 cursor-pointer ${isSelected ? 'border-purple-800' : 'border-gray'}`}
//                                     >
//                                         <div className="flex flex-col gap-3">
//                                             <p className={`text-[28px] font-medium`}>{sub.name}</p>
//                                             <p className={`text-[18px] text-gray}`}>{`${sub.duration} min`}</p>
//                                             <p className={`text-[24px] font-medium`}>{`${sub.price} AMD`}</p>
//                                         </div>
//                                         <div>
//                                             <button
//                                                 type="button"
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     handleSelectSubservice(sub);
//                                                 }}
//                                                 className={`p-3 rounded-[16px] border-[1px] ${isSelected ? 'bg-purple-800 border-white' : 'border-gray'}`}
//                                             >
//                                                 {isSelected ? <CheckedIcon /> : <PluseIcon />}
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </>

//                 )}



//             </div>
//         </div>
//     )
// }

// export default SelectService;


import { useSearchParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";



import SelectServiceByEmployee from "./Components/SelectServiceByEmpolyee";
import SelectAllServices from "./Components/SelectAllServices";
import { fetchGetEmployeeById } from "../../../../store/slice/EmployeesDataState/EmployeeApi";

const SelectService = () => {
    const [employeeParams] = useSearchParams();
    const employeeId = employeeParams.get("employeeId");

    const dispatch = useDispatch();
    const { employee } = useSelector(state => state.employeesData);

    useEffect(() => {
        if (employeeId && !employee) {
            dispatch(fetchGetEmployeeById(employeeId));
        }
    }, [dispatch, employeeId, employee]);


    if (employeeId) {
        return employee ? (
            <SelectServiceByEmployee employee={employee} />
        ) : (
            <p>Loading employee...</p>
        );
    }

    return <SelectAllServices />;
};

export default SelectService;



