import { useEffect } from "react";
import MainContainer from "../components/MainContainer";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";

const Solution = () => {
    const { t } = useTranslation(["solution"]);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <MainContainer>
            <div className="bg-white">
                <div
                    className="p-5"
                    style={{ backgroundColor: "#00a7ad", height: 350 }}
                >
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h1 className="fw-bold text-white">ELINT-X</h1>
                                <h5 className="text-white">
                                    {t("paragraph_1")}
                                </h5>
                            </div>
                            <div className="col-4"></div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="container py-2">
                        <div className="row align-items-center">
                            <div className="col-6 pe-4">
                                <h2
                                    className="fw-bold"
                                    style={{ color: "#1976d2" }}
                                >
                                    {t("header_2")}
                                </h2>
                                <h5>{t("paragraph_2")}</h5>
                            </div>
                            <div className="col-6">
                                <img
                                    src="/images/Segment.svg"
                                    alt="man and a lady in a meeting"
                                    width="100%"
                                    height="300"
                                    srcset=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5" style={{ backgroundColor: "#f7f9fc" }}>
                    <div className="container py-2">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <img
                                    src="/images/analytics.svg"
                                    alt="man sitting"
                                    width="100%"
                                    height="300"
                                    srcset=""
                                />
                            </div>
                            <div className="col-6 pe-4">
                                <h2
                                    className="fw-bold"
                                    style={{ color: "#1976d2" }}
                                >
                                    {t("header_3")}
                                </h2>
                                <h5>{t("paragraph_3")}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="container py-2">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <h2
                                    className="fw-bold"
                                    style={{ color: "#1976d2" }}
                                >
                                    {t("header_4")}
                                </h2>
                                <h5>{t("paragraph_4")}</h5>
                            </div>
                            <div className="col-6">
                                <img
                                    src="/images/Charts.svg"
                                    alt="man sitting"
                                    width="100%"
                                    height="300"
                                    srcset=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5" style={{ backgroundColor: "#f7f9fc" }}>
                    <div className="container py-2">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <img
                                    src="/images/Growth.svg"
                                    alt="man sitting"
                                    width="100%"
                                    height="300"
                                    srcset=""
                                />
                            </div>
                            <div className="col-6">
                                <h2
                                    className="fw-bold"
                                    style={{ color: "#1976d2" }}
                                >
                                    {t("header_5")}
                                </h2>
                                <h5>{t("paragraph_5")}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="container py-2">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <h2
                                    className="fw-bold"
                                    style={{ color: "#1976d2" }}
                                >
                                    {t("header_6")}
                                </h2>
                                <h5>{t("paragraph_6")}</h5>
                            </div>
                            <div className="col-6">
                                <img
                                    src="/images/Investing.svg"
                                    alt="man sitting"
                                    width="100%"
                                    height="300"
                                    srcset=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default Solution;
