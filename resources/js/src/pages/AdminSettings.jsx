import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { toast } from "react-toastify";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboardContainer from "../components/AdminDashboardContainer";
import { updateSetting, reset } from "../features/auth/authSlice";

const LANGUAGES = [
    {
        code: "en",
        name: "English",
        country_code: "gb",
    },
    {
        code: "fr",
        name: "Francais",
        country_code: "fr",
    },
    {
        code: "es",
        name: "España",
        country_code: "es",
    },
];

const AdminSettings = () => {
    const { t } = useTranslation(["login"]);
    const [data, setData] = useState({
        language: "",
        font: "",
        theme: "",
    });

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
            i18next.changeLanguage(data.language);
        }
    }, [user, isError, isSuccess, message, dispatch]);

    const handleOnChange = (e) =>
        setData({ ...data, [e.target.name]: e.target.value });

    useEffect(() => {
        setData({
            font: user?.setting?.font || "",
            theme: user?.setting?.theme || "",
            language: user?.setting?.language || "",
        });
    }, [user]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSetting(data));
    };

    return (
        <AdminDashboardContainer>
            <div className="bg-white">
                <div
                    className="card my-5 m-auto p-2"
                    style={{ maxWidth: "540px" }}
                >
                    <div className="card-body">
                        <h1 className="card-title text-primary text-center mb-4">
                            Settings
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
                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    id="language"
                                    name="language"
                                    aria-label="Floating label select example"
                                    value={data.language}
                                    onChange={handleOnChange}
                                >
                                    <option>Select preferred Language</option>
                                    {LANGUAGES.map(({ code, name }) => (
                                        <option value={code} key={code}>
                                            {name}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="floatingInput">
                                    Preferred Language
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
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminDashboardContainer>
    );
};

export default AdminSettings;
