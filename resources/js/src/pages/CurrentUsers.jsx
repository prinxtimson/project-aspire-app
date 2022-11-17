import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useTranslation } from "react-i18next";
import DashboardContainer from "../components/DashboardContainer";
import { getUserType } from "../features/analytics/analyticsSlice";
import UserTypeChart from "../components/UserTypeChart";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const CurrentUsers = () => {
    const { t } = useTranslation(["dashboard"]);

    const dispatch = useDispatch();
    const { userType } = useSelector((state) => state.analytics);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        dispatch(getUserType(7));
    }, []);

    return (
        <DashboardContainer>
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col mb-4 ">
                        <UserTypeChart
                            userType={userType}
                            type={"pie2d"}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default CurrentUsers;
