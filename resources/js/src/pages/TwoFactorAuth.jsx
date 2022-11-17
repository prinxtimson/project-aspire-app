import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    verifyCode,
    resendCode,
    reset,
    getCurrentUser,
} from "../features/auth/authSlice";
import MainContainer from "../components/MainContainer";

const TwoFactorAuth = () => {
    const [data, setData] = useState({
        code: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);

        if (isSuccess) {
            toast.success(message);
            dispatch(reset());
            dispatch(getCurrentUser());
            navigate("/dashboard", { replace: true });
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
        <div className="container-fluid bg-white">
            <div className="form-demo tw-mb-4 tw-text-white">
                <div className="flex justify-content-center tw-flex-col tw-items-center">
                    <div
                        className="card my-5 m-auto p-2"
                        style={{ maxWidth: "440px" }}
                    >
                        <div className="card-body">
                            <h2 className="text-center text-bold">
                                Two-factor Confirmation
                            </h2>
                            <div className="my-2 ">
                                <p className="text-center">
                                    Please confirm access to your account by
                                    entering the authentication code sent to
                                    your email.
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
                                        Enter Code
                                    </label>
                                </div>
                                <div className="d-grid gap-2 col-12 mx-auto">
                                    <button
                                        className={`btn btn-${
                                            isLoading ? "secondary" : "primary"
                                        } btn-lg text-white`}
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        Verify
                                    </button>
                                </div>
                                <div className="d-grid gap-2 col-12 mx-auto">
                                    <button
                                        className={`btn btn-outline-${
                                            isLoading ? "secondary" : "dark"
                                        } btn-lg`}
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => dispatch(resendCode())}
                                    >
                                        Resend Code
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorAuth;
