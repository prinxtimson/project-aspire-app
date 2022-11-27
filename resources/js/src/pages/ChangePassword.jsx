import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../components/MainContainer";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { changePass, reset } from "../features/auth/authSlice";

const ChangePassword = () => {
    const { t } = useTranslation(["change-password"]);
    const [visible, setVisible] = useState(false);
    const [oldVisible, setOldVisible] = useState(false);
    const [confirmPassVisible, setConfirmPassVisible] = useState(false);
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
                        <h1 className="card-title text-primary text-center mb-4">
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
                            <div className="input-group col-12">
                                <div className="form-floating">
                                    <input
                                        type={oldVisible ? "text" : "password"}
                                        className="form-control form-control-lg"
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
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setOldVisible(!oldVisible)}
                                >
                                    {oldVisible ? (
                                        <i className="fa fa-eye-slash"></i>
                                    ) : (
                                        <i className="fa fa-eye"></i>
                                    )}
                                </button>
                            </div>

                            <div className="input-group col-12">
                                <div className="form-floating ">
                                    <input
                                        type={visible ? "text" : "password"}
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
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setVisible(!visible)}
                                >
                                    {visible ? (
                                        <i className="fa fa-eye-slash"></i>
                                    ) : (
                                        <i className="fa fa-eye"></i>
                                    )}
                                </button>
                            </div>

                            <div className="input-group col-12">
                                <div className="form-floating ">
                                    <input
                                        type={
                                            confirmPassVisible
                                                ? "text"
                                                : "password"
                                        }
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
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                        setConfirmPassVisible(
                                            !confirmPassVisible
                                        )
                                    }
                                >
                                    {confirmPassVisible ? (
                                        <i className="fa fa-eye-slash"></i>
                                    ) : (
                                        <i className="fa fa-eye"></i>
                                    )}
                                </button>
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
