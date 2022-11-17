import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../components/MainContainer";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { changePass, reset } from "../features/auth/authSlice";

const ChangePassword = () => {
    const { t } = useTranslation(["change-password"]);
    const [formData, setFormData] = useState({
        password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const { password, new_password, new_password_confirmation } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(changePass(formData));
    };

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);

        if (isSuccess) {
            setFormData({
                password: "",
                new_password: "",
                new_password_confirmation: "",
            });
            toast.success(message);
        }
    }, [isError, isSuccess, message, dispatch]);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <MainContainer>
            <div className="bg-white">
                <div
                    className="card my-5 m-auto p-2"
                    style={{ maxWidth: "440px" }}
                >
                    <div className="card-body">
                        <h1 className="card-title text-primary text-center">
                            {t("title")}
                        </h1>
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
                                    type="password"
                                    className="form-control form-control-lg mb-3"
                                    placeholder="Old Password"
                                    name="password"
                                    onChange={handleOnChange}
                                    id="floatingInput"
                                    value={password}
                                    required
                                />
                                <label htmlFor="floatingInput">
                                    {t("old_password")}
                                </label>
                            </div>
                            <div className="form-floating col-12">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    value={new_password}
                                    placeholder="New password"
                                    id="floatingInput"
                                    name="new_password"
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="floatingInput">
                                    {t("new_password")}
                                </label>
                            </div>
                            <div className="form-floating col-12">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    value={new_password_confirmation}
                                    placeholder="Confirm new password"
                                    id="floatingInput"
                                    name="new_password_confirmation"
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="floatingInput">
                                    {t("confiem_new_password")}
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
                                    {t("btn_text")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default ChangePassword;
