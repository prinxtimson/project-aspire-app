import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import {
    getAnalytics,
    getUserType,
    getBounceRate,
    getBrowser,
    getCountry,
    getDuration,
    getPageVisit,
    clearAnalytics,
} from "../features/analytics/analyticsSlice";
import AdminDashboardContainer from "../components/AdminDashboardContainer";
import BounceRateChart from "../components/BounceRateChart";
import DurationChart from "../components/DurationChart";
import PageVisitedChart from "../components/PageVisitedChart";
import LocationChart from "../components/LocationChart";
import UserTypeChart from "../components/UserTypeChart";
import VisitorsChart from "../components/VisitorsChart";
import { Link } from "react-router-dom";

const AdminReport = () => {
    const { t } = useTranslation(["dashboard"]);
    const [period, setPeriod] = useState(7);
    const [format, setFormat] = useState("xlsx");

    const dispatch = useDispatch();
    const {
        visit,
        userType,
        page,
        country,
        bounce,
        browser,
        duration,
        isLoading,
    } = useSelector((state) => state.analytics);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        dispatch(getAnalytics(period));
        dispatch(getUserType(period));
        dispatch(getBounceRate(period));
        dispatch(getBrowser(period));
        dispatch(getCountry(period));
        dispatch(getDuration(period));
        dispatch(getPageVisit(period));
        document.title = "Visit Chart";

        return () => dispatch(clearAnalytics());
    }, []);

    const handleOnChange = (e) => {
        setPeriod(e.target.value);
        dispatch(getAnalytics(period));
        dispatch(getUserType(period));
        dispatch(getBounceRate(period));
        dispatch(getBrowser(period));
        dispatch(getCountry(period));
        dispatch(getDuration(period));
        dispatch(getPageVisit(period));
    };

    return (
        <AdminDashboardContainer>
            <div className="container-fluid p-4">
                <div className="row mb-5">
                    <div className="row mb-4 col-md-6">
                        <label htmlFor="country" className="col-sm-4">
                            {t("admin_page.period")}
                        </label>
                        <div className="col-sm-8">
                            <select
                                className="form-select"
                                aria-label="example"
                                name="period"
                                value={period}
                                onChange={handleOnChange}
                            >
                                <option value="">
                                    {t("admin_page.select_period")}
                                </option>
                                {PERIOD.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {t("admin_page.label", {
                                            num: item.value,
                                        })}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-4 col-md-6">
                        {/* <div className="col-sm-3">
                            <a
                                href={`/analytics/download?period=${period}&type=${format}`}
                                download
                                className="btn btn-primary"
                            >
                                <span className="mx-2">Export</span>
                                <i
                                    className="fa fa-download tw-text-3xl"
                                    data-pr-tooltip="Download"
                                ></i>
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <button
                                className="btn btn-secondary"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#shareModal"
                            >
                                <span className="mx-2">Share</span>
                                <i
                                    className="fa fa-share tw-text-3xl"
                                    data-pr-tooltip="Share"
                                ></i>
                            </button>
                        </div> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col col-md-6 mb-4">
                        <VisitorsChart visit={visit} period={period} />
                    </div>
                    <div className="col col-md-6 mb-4">
                        <UserTypeChart
                            userType={userType}
                            type={"doughnut2d"}
                        />
                    </div>
                    <div className="col col-md-6 mb-4">
                        <BounceRateChart bounce={bounce} />
                    </div>
                    <div className="col col-md-6 mb-4">
                        <LocationChart country={country} />
                    </div>
                    <div className="col col-md-6 mb-4">
                        <DurationChart duration={duration} />
                    </div>
                    <div className="col col-md-6 mb-4">
                        <PageVisitedChart page={page} />
                    </div>
                </div>
            </div>
        </AdminDashboardContainer>
    );
};

export default AdminReport;

const PERIOD = [
    {
        name: "Last 7 days",
        value: 7,
    },
    {
        name: "Last 30 days",
        value: 30,
    },
];

const TYPES = [
    { name: "Excel", value: "xlsx" },
    { name: "CSV", value: "csv" },
    { name: "PDF", value: "pdf" },
    { name: "HTML", value: "html" },
];

const PRODUCTS = [
    { name: "Sports", url: "../sport" },
    { name: "Health", url: "../health" },
    { name: "Entertainment", url: "../entertainment" },
    { name: "Food", url: "../food" },
    { name: "Fashion", url: "../fashion" },
];
