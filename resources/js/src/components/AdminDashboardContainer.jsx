import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { logout, markNotification, reset } from "../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import searchData from "../utils/searchData";
import SearchDialog from "./SearchDialog";
import Moment from "react-moment";
import AdminFooter from "./AdminFooter";

const AdminDashboardContainer = ({ children }) => {
    const { t } = useTranslation(["dashboard"]);
    const { routeName } = useParams();
    const dropBtnRef = useRef(null);
    const dropBellRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, notifications, isLoading, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);
    }, [isError]);

    useEffect(() => {
        if (!user) {
            return <Navigate to="/admin/login" />;
        }
    }, [user]);

    useEffect(() => {
        const notificationMenu = document.getElementById("notificationMenu");
        notificationMenu?.addEventListener("hidden.bs.dropdown", function (e) {
            dispatch(markNotification());
        });

        return () =>
            notificationMenu?.removeEventListener(
                "hidden.bs.dropdown",
                function (e) {
                    dispatch(markNotification());
                }
            );
    }, []);

    const handleSearch = () => {
        if (searchText) {
            let _filteredSearch = searchData.filter(
                (data) =>
                    data.content
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    data.name.toLowerCase().includes(searchText.toLowerCase())
            );

            setSearchResult(_filteredSearch);
        }
    };

    const handleOnClose = () => setSearchResult([]);

    const handleToggle = () => setIsActive(!isActive);

    return (
        <div className="flex-grow-1 d-flex flex-column">
            <SearchDialog
                searchResult={searchResult}
                handleOnClose={handleOnClose}
            />
            <div
                className="position-fixed"
                style={{ zIndex: 10, top: 60, right: 20 }}
            >
                {isError && (
                    <div
                        className="toast align-items-center text-white bg-danger border-0 my-2 show"
                        role="alert"
                        aria-live="assertive"
                    >
                        <div className="toast-body">{message}</div>
                    </div>
                )}
            </div>

            <div className="wrapper d-flex align-items-stretch flex-grow-1">
                <nav
                    className={`sidebar flex-column flex-shrink-0 px-3 py-2 text-white d-xl-flex ${
                        isActive ? "d-flex" : "d-none"
                    }`}
                    style={{ backgroundColor: "#00a7ad", minWidth: 250 }}
                    id="sidebarMenu"
                >
                    <Link
                        id="brand"
                        className="navbar-brand mx-auto"
                        to={user ? "/admin/dashboard" : "/admin"}
                    >
                        <img
                            src="/images/Elint_x.png"
                            alt="Elint X"
                            width="69"
                            height="68"
                        />
                    </Link>
                    <ul className="nav nav-pills flex-column mb-auto py-5">
                        <li className="">
                            <Link
                                to="/admin/dashboard"
                                className={` nav-link fw-bold ${
                                    window.location.pathname ===
                                    "/admin/dashboard"
                                        ? "active-tab bg-white"
                                        : "text-white"
                                }`}
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <button
                                className={`btn nav-link fw-bold ${
                                    window.location.pathname ===
                                    "/admin/dashboard/analytics"
                                        ? "active-tab bg-white"
                                        : "text-white"
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#analytics"
                                aria-expanded="false"
                                aria-controls="analytics"
                            >
                                Analytics
                            </button>
                            <div className="collapse" id="analytics">
                                <ul className="nav nav-pills flex-column mb-auto">
                                    <li className="ps-3">
                                        <Link
                                            to="/admin/dashboard/analytics"
                                            className="nav-link text-white"
                                        >
                                            Generate Report
                                        </Link>
                                    </li>
                                    <li className="ps-3">
                                        <Link
                                            to="/admin/dashboard/analytics/export-report"
                                            className="nav-link text-white"
                                        >
                                            Export Report
                                        </Link>
                                    </li>
                                    <li className="ps-3">
                                        <Link
                                            to="/admin/dashboard/analytics/archived-report"
                                            className="nav-link text-white"
                                        >
                                            Archived Report
                                        </Link>
                                    </li>
                                    <li className="ps-3">
                                        <Link
                                            to="/admin/dashboard/analytics/deleted-report"
                                            className="nav-link text-white"
                                        >
                                            Deleted Report
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <button
                                className={`btn nav-link fw-bold ${
                                    window.location.pathname ===
                                    "/admin/dashboard/manage-account"
                                        ? "active-tab bg-white"
                                        : "text-white"
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseExample"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                            >
                                Manage Account
                            </button>
                            <div className="collapse" id="collapseExample">
                                <ul className="nav nav-pills flex-column mb-auto">
                                    <li className="ps-3">
                                        <Link
                                            to="/admin/dashboard/manage-account"
                                            className="nav-link text-white"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="ps-3">
                                        <Link
                                            to="/admin/dashboard/manage-account/edit-profile"
                                            className="nav-link text-white"
                                        >
                                            Review Profile
                                        </Link>
                                    </li>
                                    <li className="ps-3">
                                        <Link
                                            to="/admin/dashboard/manage-account/change-password"
                                            className="nav-link text-white"
                                        >
                                            Change Password
                                        </Link>
                                    </li>
                                    <li className="ps-3">
                                        <Link
                                            to="/admin/dashboard/manage-account/delete-account"
                                            className="nav-link text-white"
                                        >
                                            Delete Admin Account
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <button
                                className={`btn nav-link fw-bold ${
                                    window.location.pathname ===
                                    "/admin/dashboard/manage-users"
                                        ? "active-tab bg-white"
                                        : "text-white"
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#manageUsers"
                                aria-expanded="false"
                                aria-controls="manageUsers"
                            >
                                Manage Users
                            </button>
                            <div className="collapse" id="manageUsers">
                                <ul className="nav nav-pills flex-column mb-auto">
                                    <li className="ps-3">
                                        <Link
                                            to="/admin/dashboard/manage-users"
                                            className="nav-link text-white"
                                        >
                                            View Users
                                        </Link>
                                    </li>
                                    <li className="ps-3">
                                        <Link
                                            to="/admin/dashboard/manage-users/subscription"
                                            className="nav-link text-white"
                                        >
                                            Manage Subscription
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link
                                to="/admin/dashboard/settings"
                                className={`nav-link fw-bold ${
                                    routeName === "/admin/dashboardsettings"
                                        ? "active-tab"
                                        : "text-white"
                                }`}
                            >
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>

                <main className="flex-grow-1 d-flex flex-column">
                    <nav
                        className="navbar navbar-light bg-white py-0"
                        style={{ minHeight: 60 }}
                    >
                        <div className="container-fluid px-3">
                            <button
                                className="navbar-toggler mx-2 d-xl-none"
                                id="sidebarCollapse"
                                type="button"
                                onClick={handleToggle}
                            >
                                <span className="navbar-toggler-icon text-primary"></span>
                            </button>
                            <Link
                                id="brand"
                                className={`navbar-brand d-xl-none ${
                                    isActive ? "d-none" : "d-block"
                                }`}
                                to="/admin/dashboard"
                            >
                                <img
                                    src="/images/Elint_x.png"
                                    alt="Elint X"
                                    width="69"
                                    height="68"
                                />
                            </Link>
                            <div className="flex-grow-1 py-2"></div>
                            <div className="flex-shrink-0 d-flex align-items-center">
                                <div className="me-2 dropdown">
                                    <a
                                        className="d-none dropdown-toggle"
                                        type="button"
                                        ref={dropBtnRef}
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        data-bs-auto-close="false"
                                        data-bs-display="static"
                                    ></a>
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            type="search"
                                            placeholder="Search"
                                            aria-label="Search"
                                            value={searchText}
                                            onChange={(e) =>
                                                setSearchText(e.target.value)
                                            }
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="submit"
                                            data-bs-toggle="modal"
                                            data-bs-target="#searchModal"
                                            onClick={handleSearch}
                                        >
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </div>
                                </div>
                                {/* <div
                                    className="me-2 dropdown-center"
                                    id="notificationMenu"
                                >
                                    <a
                                        className="d-none dropdown-toggle"
                                        type="button"
                                        ref={dropBellRef}
                                        id="dropdownMenuNotifcation"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        data-bs-auto-close="false"
                                        data-bs-display="static"
                                    ></a>
                                    <div className="position-relative me-2">
                                        <button
                                            type="button"
                                            className="btn btn-lg"
                                            onClick={() =>
                                                dropBellRef.current.click()
                                            }
                                        >
                                            <i
                                                className="bi bi-bell-fill"
                                                style={{ fontSize: 20 }}
                                            ></i>

                                            <span
                                                className="position-absolute  translate-middle badge rounded-pill bg-danger"
                                                style={{ top: 10, left: 40 }}
                                            >
                                                {user?.unread_notifications
                                                    .length || 0}
                                                <span className="visually-hidden">
                                                    unread messages
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end overflow-auto"
                                        aria-labelledby="dropdownMenuNotifcation"
                                        style={{
                                            minWidth: 320,
                                            maxHeight: 400,
                                        }}
                                    >
                                        {user?.notifications?.length > 0 ? (
                                            user?.notifications.map((item) =>
                                                item.type ==
                                                "App\\Notifications\\ProfileUpdated" ? (
                                                    <li
                                                        key={item.id}
                                                        className="list-group"
                                                    >
                                                        <div
                                                            className={`list-group-item ${
                                                                !item.read_at &&
                                                                "list-group-item-primary"
                                                            }`}
                                                        >
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">
                                                                    Profile
                                                                    update
                                                                </h5>
                                                                <small>
                                                                    <Moment
                                                                        fromNow
                                                                    >
                                                                        {
                                                                            item.created_at
                                                                        }
                                                                    </Moment>
                                                                </small>
                                                            </div>

                                                            <p className="">
                                                                Profile was
                                                                updated
                                                            </p>
                                                        </div>
                                                    </li>
                                                ) : item.type ==
                                                  "App\\Notifications\\ReportShare" ? (
                                                    <li
                                                        key={item.id}
                                                        className="list-group"
                                                    >
                                                        <div
                                                            className={`list-group-item ${
                                                                !item.read_at &&
                                                                "list-group-item-primary"
                                                            }`}
                                                        >
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">
                                                                    Report Share
                                                                </h5>
                                                                <small>
                                                                    <Moment
                                                                        fromNow
                                                                    >
                                                                        {
                                                                            item.created_at
                                                                        }
                                                                    </Moment>
                                                                </small>
                                                            </div>

                                                            <p className="">
                                                                Report had been
                                                                shared with{" "}
                                                                {item.data
                                                                    ?.email ||
                                                                    item.email}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ) : null
                                            )
                                        ) : (
                                            <li>
                                                <p className="px-3">
                                                    No new notification
                                                </p>
                                            </li>
                                        )}
                                    </ul>
                                </div> */}

                                <div className="d-flex mx-2 align-items-center">
                                    <img
                                        src={user?.avatar}
                                        alt={user?.name}
                                        className="rounded-circle me-2"
                                        width="32"
                                        height="32"
                                    />
                                    <a
                                        className="btn nav-link text-dark fw-bold mx-4"
                                        href="#"
                                        type="button"
                                        onClick={() => dispatch(logout())}
                                    >
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="flex-grow-1">{children}</div>

                    <AdminFooter dark={true} />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardContainer;
