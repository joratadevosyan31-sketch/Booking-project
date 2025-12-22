import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "./Components/LoginForm";
import ConfirmLogin from "./Components/ConfirmLogin";
import CloseIcon from "../../Components/icons/CloseIcon";

import { fetchVerifyUser } from "../../store/slice/AuthDataState/AuthDataApi";

const Login = ({ setIsLoginOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formMode, setFormMode] = useState("login");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleCloseLogin = (e) => {
        if (e.target === e.currentTarget) {
            setIsLoginOpen(false);
        }
    };


    const handleAuthSuccess = async ({ user, verificationCode }) => {
        try {
            const idToken = await user.getIdToken();

            const response = await dispatch(
                fetchVerifyUser({
                    idToken,
                    verificationCode,
                })
            ).unwrap();

            const role = String(response?.user?.role || "").toLowerCase();

            setIsLoginOpen(false);

            if (role === "admin") {
                navigate("/admin-dashboard", { replace: true });
            } else {
                navigate("/", { replace: true });
            }

        } catch (error) {
            console.error("Login verification failed:", error);
            setIsLoginOpen(true);
        }
    };

    const handleBackToLogin = () => {
        setFormMode("login");
        setConfirmationResult(null);
    };

    return (
        <div
            onClick={handleCloseLogin}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#00000033]"
        >
            <div className="relative modal-anim">
                <div className="w-[600px] rounded-[12px] border-[2px] border-gray bg-white p-6 flex flex-col items-center gap-6">
                    <h2 className="text-[36px] font-semibold">Paragon for users</h2>

                    {formMode === "login" && (
                        <LoginForm
                            setFormMode={setFormMode}
                            setConfirmationResult={setConfirmationResult}
                            setPhoneNumber={setPhoneNumber}
                        />
                    )}

                    {formMode === "confirm" && (
                        <ConfirmLogin
                            confirmationResult={confirmationResult}
                            phoneNumber={phoneNumber}
                            onSuccess={handleAuthSuccess}
                            onBack={handleBackToLogin}
                        />
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setIsLoginOpen(false)}
                    className="absolute top-3 right-3 p-2 rounded-full border border-gray hover:bg-gray-100 transition"
                >
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
};

export default Login;
