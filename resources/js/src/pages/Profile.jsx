import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../components/MainContainer";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { deleteAccount, updateUser, reset } from "../features/auth/authSlice";

const Profile = () => {
    const { t } = useTranslation(["profile"]);
    const [inputRef, setInputRef] = useState(null);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        status: "",
        avatar: "",
    });

    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const { name, avatar, status } = formData;

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);

        if (isSuccess) {
            toast.success(message);
        }
    }, [user, isError, isSuccess, message, dispatch]);

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        setFormData({
            name: user?.name || "",
            status: user?.status || "",
            avatar: user?.avatar || "",
        });
    }, [user]);

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
        setFormData({
            ...formData,
            avatar: URL.createObjectURL(e.target.files[0]),
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        //console.log(status);
        let data = new FormData();
        if (file) {
            data.append("avatar", file);
        }
        data.append("_method", "put");
        data.append("user_status", status);
        data.append("name", name);

        dispatch(updateUser(data));
    };

    return (
        <MainContainer>
            <div className="container-fluid">
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
                            <div className="py-2 position-relative">
                                <img
                                    src={avatar}
                                    alt={name}
                                    className="rounded-circle mx-auto d-block"
                                    width={150}
                                    height={150}
                                />
                                <input
                                    type="file"
                                    onChange={(e) => handleFileSelect(e)}
                                    name="avatar"
                                    id="avatar"
                                    className="d-none"
                                    accept="image/*"
                                    ref={(ref) => setInputRef(ref)}
                                />

                                <a
                                    className="btn btn-light rounded-circle position-absolute"
                                    style={{ right: 150, bottom: -5 }}
                                    onClick={() => inputRef?.click()}
                                    type="button"
                                >
                                    <i
                                        className="fas fa-camera "
                                        style={{ fontSize: 25 }}
                                    ></i>
                                </a>
                            </div>
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
                                <label htmlFor="floatingInput">Full name</label>
                            </div>
                            <div className="form-floating col-12">
                                <select
                                    className="form-select form-control form-control-lg"
                                    id="floatingSelect"
                                    aria-label="Floating label select example"
                                    name="status"
                                    value={status}
                                    onChange={handleOnChange}
                                >
                                    <option value="">Select Status</option>
                                    <option value="break">Break</option>
                                    <option value="available">Available</option>
                                    <option value="meeting">Meeting</option>
                                </select>

                                <label htmlFor="floatingInput">
                                    Change Status
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
                                    {t("save_btn")}
                                </button>
                            </div>
                        </form>
                        <div className="d-grid gap-2 col-12 py-3 mx-auto">
                            <button
                                className={`btn btn-${
                                    isLoading ? "secondary" : "danger"
                                } btn-lg text-white`}
                                type="button"
                                disabled={isLoading}
                                onClick={() => dispatch(deleteAccount())}
                            >
                                {t("delete_btn")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default Profile;
