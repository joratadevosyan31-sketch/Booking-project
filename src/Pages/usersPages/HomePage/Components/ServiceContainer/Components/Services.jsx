import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick"
import { fetchGetServicesData } from "../../../../../../store/slice/ServicesDataState/ServicesApi";
import { setProfessional, toggleSubservice } from "../../../../../../store/slice/BookingCardDataState/BookingCardDataSlice";
import { useNavigate } from "react-router";

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

const Services = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { servicesData } = useSelector((state) => state.servicesData);
    const [selectedService, setSelectedService] = useState(null);
    const [active, setActive] = useState(null)

    useEffect(() => {
        if (!servicesData || servicesData.length === 0) {
            dispatch(fetchGetServicesData());
        }
    }, [dispatch, servicesData]);

    useEffect(() => {
        if (servicesData && servicesData.length > 0 && !selectedService) {
            setSelectedService(servicesData[0]);
            setActive(servicesData[0]._id)
        }
    }, [servicesData, selectedService]);

    const handleFilter = (service) => {
        setSelectedService(service);
        setActive(service._id)
    };

    const handleSelect = (sub) => {
        dispatch(toggleSubservice(sub));
        dispatch(setProfessional(null))
        navigate("/booking");
    }

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
                        selectedService?.subServices?.map((sub, ind) => (
                            <div key={ind} className="flex items-center justify-between py-[16px] px-6 border-[2px] border-gray rounded-[18px] hover:bg-gray-100 cursor-pointer">
                                <div className="flex flex-col gap-3">
                                    <p className="text-[28px] font-medium">{sub.name}</p>
                                    <p className="text-[18px] text-gray">{`${sub.duration} min`}</p>
                                    <p className="text-[24px] font-medium">{`${sub.price} AMD`}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleSelect(sub)}
                                        type="button"
                                        className="py-3 px-5 rounded-[25px] border-[1px] boder-gray bg-white"
                                    >
                                        Book
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Services




