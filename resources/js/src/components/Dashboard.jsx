import { useSelector } from "react-redux";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import DashboardContainer from "./DashboardContainer";

const Dashboard = () => {
    const { t } = useTranslation(["dashboard"]);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <DashboardContainer>
            <div className="container-fluid p-4">
                <h1 className="fw-bold mb-4">
                    {t("index.welcome")} <span>{user?.name.split(" ")[0]}</span>
                </h1>
                <div className="">
                    <img
                        style={{ width: "100%" }}
                        src="/images/elint.jpg"
                        alt="Elint Dashboard"
                    />
                </div>
            </div>
        </DashboardContainer>
    );
};

export default Dashboard;
