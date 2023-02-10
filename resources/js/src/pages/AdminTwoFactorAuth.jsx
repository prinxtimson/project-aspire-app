import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminContainer from "../components/AdminContainer";
import {
    verifyCode,
    resendCode,
    reset,
    getCurrentUser,
} from "../features/auth/authSlice";

const AdminTwoFactorAuth = () => {
    const [data, setData] = useState({
        code: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("../login");
        }
        if (user && !user.email_verified_at) {
            navigate("/email/verify");
        }
    }, [user]);

    useEffect(() => {
        dispatch(reset());
        setTimeout(() => {
            dispatch(reset());
        }, 3000);

        if (isSuccess) {
            toast.success(message);
            dispatch(reset());
            navigate("/admin/dashboard", { replace: true });
        }
    }, [isError, isSuccess, message, navigate, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(verifyCode(data));
    };

    return (
        <AdminContainer>
            <div className="container-fluid bg-white">
                <div className="form-demo tw-mb-4 tw-text-white">
                    <div className="flex justify-content-center tw-flex-col tw-items-center">
                        <div
                            className="card my-5 m-auto p-2"
                            style={{ maxWidth: "540px" }}
                        >
                            <div className="card-body">
                                <h1 className="text-center text-bold">
                                    Two Factor Authentication
                                </h1>
                                <div className="my-2 ">
                                    <p className="text-center">
                                        A One-Time Passcode (OTP) has been sent
                                        to your registered email address. Please
                                        enter this here to confirm your
                                        identity. This code is only valid within
                                        the next 10minutes.
                                    </p>
                                </div>
                                {isError && (
                                    <div
                                        className={`alert alert-danger py-2`}
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                )}
                                <form
                                    onSubmit={handleOnSubmit}
                                    className="form row g-3 "
                                >
                                    <div className="form-floating col-12">
                                        <input
                                            className="form-control form-control-lg"
                                            value={data.code}
                                            placeholder="Code"
                                            id="floatingInput"
                                            name="code"
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">
                                            Enter OTP
                                        </label>
                                    </div>
                                    <div className="d-flex justify-content-between col-12 mx-auto">
                                        <button
                                            className={`btn btn-${
                                                isLoading
                                                    ? "secondary"
                                                    : "primary"
                                            } btn-lg text-white px-4`}
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            className={`btn btn-outline-${
                                                isLoading ? "secondary" : "dark"
                                            } btn-lg`}
                                            type="button"
                                            disabled={isLoading}
                                            onClick={() =>
                                                dispatch(resendCode())
                                            }
                                        >
                                            Resend OTP
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminContainer>
    );
};

export default AdminTwoFactorAuth;
