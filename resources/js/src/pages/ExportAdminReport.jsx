import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ShareDialog from "../components/ShareDialog";
import AdminDashboardContainer from "../components/AdminDashboardContainer";
import {
    archivedReport,
    generateReport,
    getReports,
    reset,
    trashedReport,
} from "../features/report/reportSlice";
import Moment from "react-moment";

const ExportAdminReport = () => {
    const { t } = useTranslation(["dashboard"]);
    const [filterReports, setReports] = useState([]);
    const [currentReport, setCurrentReport] = useState(null);
    const [data, setData] = useState({
        period: 7,
        format: "xlsx",
        type: "",
    });

    const dispatch = useDispatch();

    const { reports, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.report
    );

    const handleOnChange = (e) =>
        setData({ ...data, [e.target.name]: e.target.value });

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        document.title = "Export Report";
    }, []);

    useEffect(() => {
        let newReports = reports.filter(
            (item) => !item.deleted_at && !item.is_archive
        );
        setReports(newReports);
    }, [reports]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(message);
            dispatch(reset());
            dispatch(getReports());
        }

        if (isError) {
            dispatch(reset());
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        dispatch(getReports());
    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(generateReport(data));
    };

    return (
        <AdminDashboardContainer>
            <div className="container-fluid p-4">
                <ShareDialog report={currentReport} />
                <div className="row align-items-center">
                    <div className="col">
                        <div
                            className="card my-5 m-auto p-2"
                            style={{ maxWidth: "540px" }}
                        >
                            <div className="card-body">
                                <h1 className="card-title text-primary text-center">
                                    Export Report
                                </h1>
                                {isError && (
                                    <div
                                        className="alert alert-danger py-2"
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                )}
                                <form
                                    onSubmit={handleOnSubmit}
                                    className="form row g-3 "
                                >
                                    <div className="form-floating col-12">
                                        <select
                                            className="form-select"
                                            aria-label="example"
                                            name="period"
                                            value={data.period}
                                            onChange={handleOnChange}
                                        >
                                            <option value="">
                                                {t("admin_page.select_period")}
                                            </option>
                                            {PERIOD.map((item) => (
                                                <option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {t("admin_page.label", {
                                                        num: item.value,
                                                    })}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor="country" className="">
                                            {t("admin_page.period")}
                                        </label>
                                    </div>
                                    <div className="form-floating col-12">
                                        <select
                                            className="form-select"
                                            aria-label="example"
                                            name="format"
                                            value={data.format}
                                            onChange={handleOnChange}
                                        >
                                            <option value="">
                                                Select format
                                            </option>
                                            {FORMAT.map((item) => (
                                                <option
                                                    key={item.name}
                                                    value={item.value}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor="format" className="">
                                            Select Format
                                        </label>
                                    </div>
                                    <div className="form-floating col-12">
                                        <select
                                            className="form-select"
                                            aria-label="example"
                                            name="type"
                                            value={data.type}
                                            onChange={handleOnChange}
                                        >
                                            <option value="">
                                                Select type
                                            </option>
                                            {TYPES.map((item) => (
                                                <option
                                                    key={item.name}
                                                    value={item.value}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor="type" className="">
                                            Select Type
                                        </label>
                                    </div>
                                    <div className="d-grid gap-2 col-12 mx-auto">
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            <span className="mx-2">Export</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Owner</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterReports.length > 0 ? (
                                        filterReports.map((report) => (
                                            <tr
                                                key={report.id}
                                                className="align-middle"
                                            >
                                                <th scope="row">{report.id}</th>
                                                <td>{report.name}</td>
                                                <td>
                                                    <Moment format="lll">
                                                        {report.created_at}
                                                    </Moment>
                                                </td>
                                                <td>{report.user?.name}</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn dropdown-toggle"
                                                            id={`dropdown${report.id}`}
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            <i
                                                                className="fa  fa-bars  "
                                                                data-pr-tooltip="Menu"
                                                            ></i>
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a
                                                                    className="dropdown-item"
                                                                    href={
                                                                        report.file_url
                                                                    }
                                                                    target="_blank"
                                                                >
                                                                    Download
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item "
                                                                    type="button"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#shareModal"
                                                                    onClick={() =>
                                                                        setCurrentReport(
                                                                            report
                                                                        )
                                                                    }
                                                                >
                                                                    Share
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            archivedReport(
                                                                                report.id
                                                                            )
                                                                        )
                                                                    }
                                                                >
                                                                    Archive
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            trashedReport(
                                                                                report.id
                                                                            )
                                                                        )
                                                                    }
                                                                >
                                                                    Trashed
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td>
                                                <strong>No report found</strong>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardContainer>
    );
};

export default ExportAdminReport;

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

const FORMAT = [
    { name: "Excel", value: "xlsx" },
    { name: "CSV", value: "csv" },
    { name: "PDF", value: "pdf" },
    { name: "HTML", value: "html" },
];

const TYPES = [
    { name: "Bounce Rate", value: "bounce-rate" },
    { name: "Time Spent", value: "duration" },
    { name: "Page Visit", value: "page-visit" },
    { name: "Location", value: "location" },
    { name: "User Type", value: "user-type" },
];
