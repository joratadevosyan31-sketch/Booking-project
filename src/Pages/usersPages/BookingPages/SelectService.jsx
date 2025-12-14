import Slider from "react-slick"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGetServicesData } from "../../../store/slice/ServicesDataState/ServicesApi";
import { setProfessional, toggleSubservice, clearSelectedSubservices } from "../../../store/slice/BookingDataState/BookingDataSlice";
import PluseIcon from "../../../Components/icons/PluseIcon";
import CheckedIcon from "../../../Components/icons/CheckedIcon";

const btnSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    variableWidth: true,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
            }
        },
        {
            breakpoint: 639,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 3
            }
        },
    ]
};

const SelectService = () => {

    const dispatch = useDispatch();
    const { servicesData } = useSelector((state) => state.servicesData);
    const { selectedSubservices } = useSelector((state) => state.bookingData);
    const [selectedService, setSelectedService] = useState(null);
    const [active, setActive] = useState(null);

    useEffect(() => {
        if (!servicesData || servicesData.length === 0) {
            dispatch(fetchGetServicesData());
        }
    }, [dispatch, servicesData]);

    useEffect(() => {
        if (servicesData && servicesData.length > 0 && selectedSubservices && selectedSubservices.length > 0) {
            const firstSubservice = selectedSubservices[0];
            const serviceId = firstSubservice.service || firstSubservice.service?._id;
            const foundService = servicesData.find(ser => ser._id === serviceId);
            if (foundService && !selectedService) {
                setSelectedService(foundService);
                setActive(serviceId);
            }
        } else if (servicesData && servicesData.length > 0 && !selectedService) {
            // If no subservices selected, default to first service
            setSelectedService(servicesData[0]);
            setActive(servicesData[0]._id);
        }
    }, [servicesData, selectedSubservices, selectedService]);

    const handleFilter = (service) => {
        setSelectedService(service);
        setActive(service._id);
        // Clear subservices when switching to a different service
        if (selectedSubservices && selectedSubservices.length > 0) {
            const firstSubservice = selectedSubservices[0];
            const currentServiceId = firstSubservice.service || firstSubservice.service?._id;
            if (currentServiceId !== service._id) {
                dispatch(clearSelectedSubservices());
                dispatch(setProfessional(null));
            }
        }
    };

    const handleSelectSubservice = (sub) => {
        dispatch(toggleSubservice(sub));
        // Only clear professional if switching to different service
        const firstSubservice = selectedSubservices && selectedSubservices.length > 0 ? selectedSubservices[0] : null;
        if (firstSubservice) {
            const currentServiceId = firstSubservice.service || firstSubservice.service?._id;
            const newServiceId = sub.service || sub.service?._id;
            if (currentServiceId !== newServiceId) {
                dispatch(setProfessional(null));
            }
        } else {
            dispatch(setProfessional(null));
        }
    };

    return (
        <div id="services">
            <div className="container flex flex-col gap-6">
                <div className="">
                    <h2 className="text-[48px] font-bold">Services</h2>
                </div>
                <div className="m-auto px-6 w-full max-w-[1340px] btn-slider">
                    <Slider {...btnSettings}>
                        {
                            servicesData.map((ser, ind) => (
                                <button
                                    onClick={() => handleFilter(ser)}
                                    key={ind}
                                    className={`px-4 py-2 rounded-full text-[24px] ${active === ser._id ? "bg-black text-white" : ""}`}
                                >
                                    {ser.name}
                                </button>
                            ))
                        }
                    </Slider>
                </div>
                <div className="flex flex-col gap-4">
                    {
                        selectedService?.subServices?.map((sub, ind) => {
                            const isSelected = selectedSubservices && selectedSubservices.some(selected => selected._id === sub._id);
                            return (
                                <div
                                    key={ind}
                                    onClick={() => handleSelectSubservice(sub)}
                                    className={`flex items-center justify-between bg-white py-[16px] px-6 border-[2px] rounded-[18px] hover:bg-gray-100 cursor-pointer ${isSelected ? 'border-purple-800' : 'border-gray'}`}
                                >
                                    <div className="flex flex-col gap-3">
                                        <p className={`text-[28px] font-medium `}>{sub.name}</p>
                                        <p className={`text-[18px] text-gray}`}>{`${sub.duration} min`}</p>
                                        <p className={`text-[24px] font-medium`}>{`${sub.price} AMD`}</p>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectSubservice(sub);
                                            }}
                                            className={`p-3 rounded-[16px] border-[1px] ${isSelected ? 'bg-purple-800 border-white' : 'boder-gray'}`}
                                        >
                                            {isSelected ? (
                                                <CheckedIcon />
                                            ) : (
                                                <PluseIcon />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default SelectService