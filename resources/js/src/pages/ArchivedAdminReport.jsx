import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AdminDashboardContainer from "../components/AdminDashboardContainer";
import {
    deleteReport,
    getReports,
    reset,
    restoredReport,
} from "../features/report/reportSlice";
import Moment from "react-moment";

const ArchivedAdminReport = () => {
    const { t } = useTranslation(["dashboard"]);
    const [filterReports, setReports] = useState([]);

    const dispatch = useDispatch();

    const { reports, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.report
    );

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        document.title = "Export Report";
    }, []);

    useEffect(() => {
        let newReports = reports.filter(
            (item) => !item.deleted_at && item.is_archive
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

    return (
        <AdminDashboardContainer>
            <div className="container-fluid p-4">
                <div className="row align-items-center">
                    <div className="col">
                        <h1 className=" text-primary text-center">
                            Archive Report
                        </h1>
                        {isError && (
                            <div
                                className="alert alert-danger py-2"
                                role="alert"
                            >
                                {message}
                            </div>
                        )}
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
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            restoredReport(
                                                                                report.id
                                                                            )
                                                                        )
                                                                    }
                                                                >
                                                                    Restore
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            deleteReport(
                                                                                report.id
                                                                            )
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
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

export default ArchivedAdminReport;
