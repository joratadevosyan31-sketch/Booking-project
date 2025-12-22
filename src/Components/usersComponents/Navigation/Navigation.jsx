import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"

import Login from "../../../Modal/LoginModal/Login"
import { fetchInvalidateLogOut } from "../../../store/slice/AuthDataState/AuthDataApi"

const Navigation = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isAuthenticated, token } = useSelector(state => state.authData)

    const [isLoginOpen, setIsLoginOpen] = useState(false)


    useEffect(() => {
        document.body.style.overflow = isLoginOpen ? "hidden" : "auto"

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isLoginOpen])


    const handleSignOut = () => {
        dispatch(fetchInvalidateLogOut({ token }))
        navigate("/", { replace: true })

        window.location.reload()
    }

    return (
        <>
            <nav className="border-[1px] border-gray py-3 z-50 sticky top-0 bg-white">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <ul className="flex items-center gap-4">
                            <li><a href="#services" className="text-[24px] font-medium">Services</a></li>
                            <li><a href="#team" className="text-[24px] font-medium">Team</a></li>
                            <li><a href="#about" className="text-[24px] font-medium">About</a></li>
                        </ul>

                        <div>
                            {isAuthenticated ? (
                                <button
                                    onClick={handleSignOut}
                                    type="button"
                                    className="text-[24px] text-red-600 font-semibold p-3 rounded-[25px]"
                                >
                                    Sign out
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsLoginOpen(true)}
                                    type="button"
                                    className="text-[24px] text-blue-700 font-semibold p-3 rounded-[25px]"
                                >
                                    Sign up
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} />}
        </>
    )
}

export default Navigation
