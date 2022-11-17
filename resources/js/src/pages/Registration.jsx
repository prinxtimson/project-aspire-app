import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import ReactGA from "react-ga";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { register, reset } from "../features/auth/authSlice";

const Registration = () => {
    const { t } = useTranslation(["register"]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);

        if (isSuccess) {
            navigate("/two-factor-auth");
        }
    }, [user, isError, isSuccess, message, dispatch]);

    const { name, email, password, password_confirmation } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();

        dispatch(register(formData));
    };

    return (
        <MainContainer>
            <div className="container-fluid bg-white">
                <div className="row align-items-center">
                    <div className="col">
                        <div
                            className="card my-5 m-auto p-2"
                            style={{ maxWidth: "440px" }}
                        >
                            <div className="card-body">
                                <h1 className="card-title text-primary text-center">
                                    {t("title")}
                                </h1>
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
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Full name"
                                            name="name"
                                            id="floatingInput"
                                            value={name}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">
                                            {t("name")}
                                        </label>
                                    </div>
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
                                    <div className="form-floating col-12">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            value={password}
                                            placeholder="Password"
                                            id="floatingInput"
                                            name="password"
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">
                                            {t("password")}
                                        </label>
                                    </div>
                                    <div className="form-floating col-12">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            value={password_confirmation}
                                            placeholder="Confirm password"
                                            id="floatingInput"
                                            name="password_confirmation"
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">
                                            {t("confirm_password")}
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
                                    {`${t("have_account")} `}
                                    <Link to="/login">{t("login")}</Link>
                                </p>
                                <p className="text-muted mb-0 mt-4">
                                    {
                                        "By Submitting this form, I agree to Elint-X's "
                                    }
                                    <Link color="inherit" to="/privacy-policy">
                                        {t("privacy_policy")}
                                    </Link>
                                    {" and "}
                                    <Link
                                        color="inherit"
                                        to="/terms-and-conditions"
                                    >
                                        {t("terms_and_conditions")}
                                    </Link>
                                    {"."}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col d-sm-none d-md-block">
                        <img
                            style={{ width: "100%" }}
                            src="/images/login.png"
                            alt="Login"
                        />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default Registration;
