import { useEffect } from "react";
import MainContainer from "../components/MainContainer";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
    const { t } = useTranslation(["about-us"]);

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
                <div className="py-5">
                    <div className="container py-2">
                        <div className="d-flex justify-content-center">
                            <div className="p-4">
                                <div className="clearfix shadow-lg p-5 mb-5 rounded">
                                    <img
                                        src="/images/google_analytics.svg"
                                        alt="man and a lady in a meeting"
                                        className="col-md-6 float-md-end mb-3 ms-md-3"
                                        srcset=""
                                    />
                                    <h5 className="mb-4 text-muted fs-4">
                                        {t("first_paragraph")}
                                    </h5>
                                    <h5 className="mb-4 text-muted fs-4">
                                        {t("second_paragraph")}
                                    </h5>
                                    <h5 className="mb-4 text-muted fs-4">
                                        {t("third_paragraph")}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default AboutUs;
