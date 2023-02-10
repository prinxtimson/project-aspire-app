import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdminContainer from "../components/AdminContainer";
import ReactGA from "react-ga";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { registerAdmin, reset } from "../features/auth/authSlice";

const AdminRegistration = () => {
    const { t } = useTranslation(["register"]);
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        dob: "",
        role: "admin",
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
            toast.success(message);
            navigate("/email/verify");
        }
    }, [user, isError, isSuccess, message, dispatch]);

    const { name, username, email, dob, password, password_confirmation } =
        formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(registerAdmin(formData));
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
                                    Account Registration
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
                                    autoComplete="off"
                                >
                                    <div className="form-floating col-12">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Full Name"
                                            id="name"
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
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Username"
                                            id="username"
                                            autoComplete="new-username"
                                            value={username}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">
                                            Username
                                        </label>
                                    </div>
                                    <div className="form-floating col-12">
                                        <input
                                            type="date"
                                            className="form-control form-control-lg"
                                            value={dob}
                                            placeholder="Date of Birth"
                                            id="dob"
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">
                                            Date of Birth
                                        </label>
                                    </div>
                                    <div className="form-floating col-12">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            value={email}
                                            placeholder="Email"
                                            id="email"
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">
                                            {t("email")}
                                        </label>
                                    </div>
                                    <div className="">
                                        <div className="input-group col-12">
                                            <div className="form-floating">
                                                <input
                                                    type={
                                                        visible
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    className="form-control form-control-lg"
                                                    value={password}
                                                    placeholder="Password"
                                                    id="password"
                                                    autoComplete="new-password"
                                                    onChange={handleOnChange}
                                                    required
                                                />
                                                <label htmlFor="floatingInput">
                                                    {t("password")}
                                                </label>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() =>
                                                    setVisible(!visible)
                                                }
                                            >
                                                {visible ? (
                                                    <i className="fa fa-eye-slash"></i>
                                                ) : (
                                                    <i className="fa fa-eye"></i>
                                                )}
                                            </button>
                                        </div>
                                        <div
                                            id="passwordHelpBlock"
                                            className="form-text"
                                        >
                                            Your password must be 8-12
                                            characters long, contain letters and
                                            numbers, and must not contain
                                            spaces, special characters, or
                                            emoji.
                                        </div>
                                    </div>

                                    <div className="input-group col-12">
                                        <div className="form-floating">
                                            <input
                                                type={
                                                    visible1
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="form-control form-control-lg"
                                                value={password_confirmation}
                                                placeholder="Confirm password"
                                                id="password_confirmation"
                                                onChange={handleOnChange}
                                                required
                                            />
                                            <label htmlFor="floatingInput">
                                                {t("confirm_password")}
                                            </label>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() =>
                                                setVisible1(!visible1)
                                            }
                                        >
                                            {visible1 ? (
                                                <i className="fa fa-eye-slash"></i>
                                            ) : (
                                                <i className="fa fa-eye"></i>
                                            )}
                                        </button>
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
                                {/* <p className="my-1">
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
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminContainer>
    );
};

export default AdminRegistration;
