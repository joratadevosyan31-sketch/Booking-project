import { Outlet } from 'react-router'
import CloseIcon from '../../Components/icons/CloseIcon'

const LoginLayout = () => {

    return (
        <div className="flex items-center justify-center absolute inset-0  bg-[#00000033] z-[9999]">
            <div className="relative">
                <div className="w-[600px] flex flex-col items-center gap-6 border-[2px] border-gray p-6 rounded-[12px] bg-white">
                    <h2 className="text-[36px]">Paragon for users</h2>
                    <Outlet />
                    {/* <p className="w-[400px] text-center text-[18px] text-gray-600">Create an account or log in to book and manage your appointments.</p>
                    <form
                        action=""
                        className="flex flex-col gap-4"
                    >
                        <input type="email" placeholder="email" className="border-[2px] border-black rounded-[12px] text-[20px] py-3 px-5" />
                        <input type="tel" placeholder="phone" className="border-[2px] border-black rounded-[12px] text-[20px] py-3 px-5" />
                        <button
                            type="submit"
                            className="px-5 py-3 bg-black text-white rounded-[25px]"
                        >
                            Continue</button>
                    </form> */}
                </div>
                <button
                    type="button"
                    className="absolute top-3 right-3 p-2 border-[1px] border-gray rounded-full"
                >
                    <CloseIcon />
                </button>
            </div>
        </div>
    )
}

export default LoginLayout