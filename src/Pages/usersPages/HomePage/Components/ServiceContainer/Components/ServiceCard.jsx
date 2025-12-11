import { Rate } from "antd"
import TimeIcon from "../../../../../../Components/icons/TimeIcon"
import DirectionIcon from "../../../../../../Components/icons/DirectionIcon"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchGetSalonData } from "../../../../../../store/slice/SalonDataState/SalonApi"

const ServiceCard = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { salonData } = useSelector(state => state.salonData)

    useEffect(() => {
        if (!salonData || salonData.length === 0) {
            dispatch(fetchGetSalonData())
        }
    }, [dispatch])


    return (
        <div className="border-[2px] border-gray rounded-[18px] ">
            <div className="flex flex-col gap-5 border-b-2 border-gray p-6">
                <h2 className="text-[36px] font-bold">{salonData.name}</h2>
                <div className='flex items-center gap-1'>
                    <span>5.0</span>
                    <Rate disabled defaultValue={5} />
                    <span>2340</span>
                </div>
                <button
                    onClick={() => navigate("/booking")}
                    type='button'
                    className="w-full text-white text-[24px] bg-black py-[20px] px- rounded-[25px] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Book now
                </button>
            </div>
            <div className="flex flex-col gap-5 p-6">
                <div className="flex items-center gap-3">
                    <TimeIcon />
                    <p className="text-[18px] text-green-700">{`Open until ${salonData.workEnd}`}</p>
                </div>
                <div className="flex items-center gap-3">
                    <DirectionIcon />
                    <div className="flex flex-col gap-1 ">
                        <p>{salonData.address}</p>
                        <a href="https://www.google.com/maps?daddr=+9+Ghazar+Parpetsi+St,+8,+Yerevan,+0002" className='text-purple-950'>Get Direction</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard