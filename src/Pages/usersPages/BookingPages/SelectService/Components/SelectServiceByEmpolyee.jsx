import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import PluseIcon from "../../../../../Components/icons/PluseIcon";
import CheckedIcon from "../../../../../Components/icons/CheckedIcon";
import {
    clearSelectedSubservices,
    setProfessional,
    toggleSubservice
} from "../../../../../store/slice/BookingCardDataState/BookingCardDataSlice";
import { useEffect, useState } from "react";

const btnSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    variableWidth: true,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
        { breakpoint: 639, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    ]
};

const SelectServiceByEmployee = ({ employee }) => {
    const dispatch = useDispatch();
    const { subServices } = useSelector(state => state.bookingCardData);
    const [activeServiceId, setActiveServiceId] = useState(employee?.services?.[0]?._id || null);

    useEffect(() => {
        if (employee) {
            localStorage.setItem("selectedEmployee", JSON.stringify(employee));
            dispatch(setProfessional(employee));
        }
    }, [employee, dispatch]);

    const handleFilter = (service) => {
        if (subServices && subServices.length > 0) {
            const firstSubservice = subServices[0];
            const currentServiceId = firstSubservice.service?._id || firstSubservice.service;

            if (currentServiceId !== service._id) {
                dispatch(clearSelectedSubservices());
            }
        }
        setActiveServiceId(service._id);
    };

    const handleSelectSubservice = (sub) => {
        dispatch(toggleSubservice(sub));
    };

    useEffect(() => {
        if (employee?.services?.length > 0) {
            setActiveServiceId(employee.services[0]._id);
        }
    }, [employee?.services]);

    return (
        <div className="flex flex-col p-6 border rounded-lg gap-4">
            <div className="flex items-center gap-4">
                <img src={employee?.img} alt={employee?.name} className="w-16 h-16 rounded-full object-cover" />
                <p className="text-[24px] font-bold">{employee?.name}</p>
            </div>

            <div className="m-auto px-6 w-full max-w-[1340px] btn-slider">
                <Slider {...btnSettings}>
                    {employee?.services?.map((ser) => (
                        <div key={ser._id} className="px-2">
                            <button
                                onClick={() => handleFilter(ser)}
                                className={`px-4 py-2 rounded-full text-[24px] transition-colors
                                    ${ser._id === activeServiceId ? 'bg-black text-white' : 'bg-white text-black border border-gray'}`}
                            >
                                {ser.name}
                            </button>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="flex flex-col gap-4">
                {employee?.subServices
                    ?.filter(sub => (sub.service?._id || sub.service) === activeServiceId)
                    .map((sub) => {
                        const isSelected = subServices?.some(selected => selected._id === sub._id);
                        return (
                            <div
                                key={sub._id}
                                onClick={() => handleSelectSubservice(sub)}
                                className={`flex items-center justify-between bg-white py-[16px] px-6 border-[2px] rounded-[18px] hover:bg-gray-50 cursor-pointer transition-all ${isSelected ? 'border-purple-800' : 'border-gray-200'}`}
                            >
                                <div className="flex flex-col gap-3">
                                    <p className="text-[28px] font-medium">{sub.name}</p>
                                    <p className="text-[18px] text-gray-500">{`${sub.duration} min`}</p>
                                    <p className="text-[24px] font-medium">{`${sub.price} AMD`}</p>
                                </div>
                                <div>
                                    <div className={`p-3 rounded-[16px] border-[1px] ${isSelected ? 'bg-purple-800 border-white' : 'border-gray-300'}`}>
                                        {isSelected ? <CheckedIcon /> : <PluseIcon />}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default SelectServiceByEmployee;