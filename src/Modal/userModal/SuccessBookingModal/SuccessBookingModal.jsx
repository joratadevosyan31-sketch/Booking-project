import { useNavigate } from "react-router"

const SuccessBookingModal = ({ setIsBookingSuccess }) => {

    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center fixed inset-0  bg-[#00000033] z-[9999]">
            <div className='modal-anim w-[400px] flex flex-col items-center gap-6 border-[2px] border-gray p-6 rounded-[12px] bg-white'>
                <img src="https://img.icons8.com/ios11/512/40C057/ok.png" alt="" className='size-20' />
                <p className='text-[20px] font-semibold text-center'>Your appointment has been successfully booked. See you soon!</p>
                <button
                    onClick={() => {
                        setIsBookingSuccess(false);
                        navigate("/", { replace: true });
                    }}
                    type="submit"
                    className="px-5 py-3 bg-black text-white rounded-[25px]"
                >
                    OK
                </button>
            </div>
        </div>
    )
}

export default SuccessBookingModal