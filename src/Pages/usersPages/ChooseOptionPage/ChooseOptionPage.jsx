import { useNavigate } from "react-router"
import CloseIcon from "../../../Components/icons/CloseIcon"


const ChooseOptionPage = () => {

    const navigate = useNavigate()

    return (
        <div className="container relative">
            <div className="w-[800px] m-auto pt-[100px]">
                <div className="flex flex-col gap-8 mb-7">
                    <h2 className="text-[48px]  text-black">Choose option</h2>
                    <p className="text-[28px] text-black">Book</p>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="w-full border-[2px] boreder-gray flex flex-col gap-4 p-[24px] rounded-[25px] cursor-pointer  hover:bg-[#C9C9C9] duration-75">
                        <h3 className="text-[24px] font-bold">Book an apointment</h3>
                        <p className="text-[20px] ">Schedule services for yourself</p>
                    </div>

                    <div className="w-full border-[2px] boreder-gray flex flex-col gap-4 p-[24px] rounded-[25px] cursor-pointer  hover:bg-[#C9C9C9] duration-75">
                        <h3 className="text-[24px] font-bold">Group appointment</h3>
                        <p className="text-[20px] ">For yourself and others</p>
                    </div>
                </div>
            </div>
            <button
                onClick={() => navigate(-1)}
                type="button"
                className="absolute right-[16px] top-[16px] p-[12px] border-[2px] border-gray rounded-full"
            >
                <CloseIcon />
            </button>
        </div>
    )
}

export default ChooseOptionPage