import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminContainer from "../components/AdminContainer";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { forgotPass, reset } from "../features/auth/authSlice";

const AdminForgotPassword = () => {
    const { t } = useTranslation(["forgot-password"]);
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const handleOnChange = (e) => setEmail(e.target.value);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);

        if (isSuccess) {
            setEmail("");
            toast.success(message);
        }
    }, [isError, isSuccess, message, dispatch]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPass({ email }));
    };

    return (
        <AdminContainer>
            <div className="container-fluid bg-white">
                <div className="row align-items-center">
                    <div className="col">
                        <div
                            className="card my-5 m-auto p-2"
                            style={{ maxWidth: "540px" }}
                        >
                            <div className="card-body">
                                <h1 className="card-title text-primary text-center">
                                    Forgot Password
                                </h1>
                                <p>
                                    Please enter your registered email address
                                    here and then check your inbox for a link to
                                    reset your password.
                                </p>
                                <p className="lead text-center">
                                    <i className="fas fa-user"></i>{" "}
                                    {t("sub_title")}
                                </p>
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
                                    className="form row g-3"
                                >
                                    <div className="form-floating col-12">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            value={email}
                                            placeholder="Email"
                                            id="floatingInput"
                                            name="email"
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">
                                            {t("email")}
                                        </label>
                                    </div>
                                    <div className="d-grid gap-2 col-12 mx-auto">
                                        <button
                                            className={`btn btn-${
                                                isLoading
                                                    ? "secondary"
                                                    : "primary"
                                            } btn-lg text-white`}
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            {t("btn_text")}
                                        </button>
                                    </div>
                                </form>
                                <p className="my-1">
                                    {t("remember_password") + " "}
                                    <Link to="/admin/login">{t("login")}</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminContainer>
    );
};

export default AdminForgotPassword;
