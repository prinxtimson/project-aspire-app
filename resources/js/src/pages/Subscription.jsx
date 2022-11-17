import { useEffect } from "react";
import { useSelector } from "react-redux";
import MainContainer from "../components/MainContainer";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";

const Subscription = () => {
    const { t } = useTranslation(["subscription"]);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <MainContainer>
            <div className="bg-white">
                <div
                    className="p-5"
                    style={{ backgroundColor: "#00a7ad", height: 200 }}
                >
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h1 className="fw-bold text-white">
                                    {t("title")}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container py-3">
                    <main>
                        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                            <h1 className="display-4 fw-normal">
                                {t("sub_title")}
                            </h1>
                            <p className="fs-5 text-muted">{t("p")}</p>
                        </div>
                        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-header py-3">
                                        <h4 className="my-0 fw-normal">
                                            {t("basic")}
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <div
                                            style={{ height: 200 }}
                                            className="card-body p-1 px-4 text-black"
                                        >
                                            <ul className="">
                                                <li>Monthly - &#163;25/M</li>
                                                <li>Annually - &#163;250/Y</li>
                                            </ul>
                                            <ul className="">
                                                <li>Food</li>
                                                <li>Entertainment</li>
                                            </ul>
                                        </div>
                                        <Link
                                            type="button"
                                            className="w-100 btn btn-lg btn-outline-primary"
                                            to={
                                                user
                                                    ? "/subscribe/basic"
                                                    : "/login"
                                            }
                                        >
                                            {t("subscribe_now")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-header py-3">
                                        <h4 className="my-0 fw-normal">
                                            {t("essentials")}
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <div
                                            style={{ height: 200 }}
                                            className="card-body p-1 px-4 text-black"
                                        >
                                            <ul className="">
                                                <li>Monthly - &#163;40/M</li>
                                                <li>Annually - &#163;420/Y</li>
                                            </ul>
                                            <ul className="">
                                                <li>Food</li>
                                                <li>Entertainment</li>
                                                <li>Health</li>
                                                <li>Fashion</li>
                                            </ul>
                                        </div>
                                        <Link
                                            type="button"
                                            className="w-100 btn btn-lg btn-primary text-white"
                                            to={
                                                user
                                                    ? "/subscribe/essentials"
                                                    : "/login"
                                            }
                                        >
                                            {t("subscribe_now")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm border-primary">
                                    <div className="card-header py-3 text-white bg-primary border-primary">
                                        <h4 className="my-0 fw-normal">
                                            {t("platinum")}
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <div
                                            style={{ height: 200 }}
                                            className="card-body p-1 px-4 text-black"
                                        >
                                            <ul className="">
                                                <li>Monthly - &#163;40/M</li>
                                                <li>Annually - &#163;420/Y</li>
                                            </ul>
                                            <ul className="">
                                                <li>Food</li>
                                                <li>Entertainment</li>
                                                <li>Health</li>
                                                <li>Sports</li>
                                                <li>Fashion</li>
                                            </ul>
                                        </div>
                                        <Link
                                            type="button"
                                            className="w-100 btn btn-lg btn-primary text-white"
                                            to={
                                                user
                                                    ? "/subscribe/platinum"
                                                    : "/login"
                                            }
                                        >
                                            {t("subscribe_now")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </MainContainer>
    );
};

export default Subscription;
