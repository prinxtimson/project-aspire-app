import { useEffect } from "react";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AdminDashboardContainer from "./AdminDashboardContainer";
import BounceRateChart from "./BounceRateChart";
import DurationChart from "./DurationChart";
import PageVisitedChart from "./PageVisitedChart";
import {
    getUserType,
    getDuration,
    getBounceRate,
    getPageVisit,
} from "../features/analytics/analyticsSlice";
import UserTypeChart from "./UserTypeChart";
import moment from "moment";

const AdminDashboard = () => {
    const { t } = useTranslation(["dashboard"]);

    const dispatch = useDispatch();
    const { user, isError, message } = useSelector((state) => state.auth);
    const { userType, bounce, duration, page } = useSelector(
        (state) => state.analytics
    );

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);

        dispatch(getUserType(7));
        dispatch(getBounceRate(7));
        dispatch(getPageVisit(7));
        dispatch(getDuration(7));
    }, []);

    return (
        <AdminDashboardContainer>
            <div className="container-fluid p-4">
                <div className="py-4">
                    <h1 className="display-6 fw-bold text-center ">
                        Welcome {user?.name}, {moment().format("LL")}
                    </h1>
                </div>
                <div className="row">
                    <div className="col col-md-6 mb-4">
                        <BounceRateChart bounce={bounce} />
                    </div>
                    <div className="col col-md-6 mb-4">
                        <DurationChart duration={duration} />
                    </div>
                    <div className="col col-md-6 ">
                        <UserTypeChart userType={userType} type={"pie2d"} />
                    </div>
                    <div className="col col-md-6">
                        <PageVisitedChart page={page} />
                    </div>
                </div>
            </div>
        </AdminDashboardContainer>
    );
};

export default AdminDashboard;
