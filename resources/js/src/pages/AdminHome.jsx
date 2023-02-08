import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import AdminContainer from "../components/AdminContainer";

const AdminHome = () => {
    const { t } = useTranslation(["home"]);

    const { user, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <AdminContainer>
            <div className="" style={{ minHeight: "100%" }}>
                <div className="container h-100">
                    <div className="row align-items-center h-100">
                        <h1
                            className="display-2 fw-bold text-center "
                            //style={{ color: "blue" }}
                        >
                            {t("welcome")}
                        </h1>
                        <div className="col">
                            <h2 className="fs-1 text-center">Elint-X</h2>

                            <p>
                                ipsum lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>

                            <p>
                                lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                        <div className="col d-sm-none d-md-block">
                            <img
                                style={{ width: "100%" }}
                                src="/images/metrix.svg"
                                alt="Metrix"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminContainer>
    );
};

export default AdminHome;
