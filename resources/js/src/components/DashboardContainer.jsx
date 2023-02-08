import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, Navigate } from "react-router-dom";
import MainFooter from "./MainFooter";
import { logout, markNotification, reset } from "../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import searchData from "../utils/searchData";
import SearchDialog from "./SearchDialog";
import Moment from "react-moment";

const DashboardContainer = ({ children }) => {
    const { t } = useTranslation(["dashboard"]);
    const { routeName } = useParams();
    const dropBtnRef = useRef(null);
    const dropBellRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const dispatch = useDispatch();
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
            return <Navigate to="../login" />;
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
                    className={`sidebar flex-column flex-shrink-0 px-3 py-2 text-white d-flex ${
                        isActive ? "active" : null
                    }`}
                    style={{ backgroundColor: "#00a7ad" }}
                    id="sidebarMenu"
                >
                    <Link id="brand" className="navbar-brand mx-auto" to="/">
                        <img
                            src="/images/Elint_x.png"
                            alt="Elint X"
                            width="69"
                            height="68"
                        />
                    </Link>
                    <ul className="nav nav-pills flex-column mb-auto py-5">
                        {!isLoading && user?.roles[0]?.name === "admin" ? (
                            <>
                                <li className="nav-item">
                                    <div className="btn-group dropend">
                                        <Link
                                            to="/dashboard"
                                            className={`btn nav-link fw-bold ${
                                                window.location.pathname ===
                                                "/dashboard"
                                                    ? "active-tab bg-white"
                                                    : "text-white"
                                            }`}
                                            aria-current="page"
                                        >
                                            {t("container.tab_1")}
                                        </Link>
                                        <button
                                            type="button"
                                            className={`btn dropdown-toggle dropdown-toggle-split nav-link fw-bold ${
                                                window.location.pathname ===
                                                "/dashboard"
                                                    ? "active-tab bg-white"
                                                    : "text-white"
                                            }`}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <span className="visually-hidden">
                                                Toggle Dropdown
                                            </span>
                                        </button>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link
                                                    to="/dashboard/product-sales"
                                                    className="dropdown-item"
                                                >
                                                    Product Sales
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/dashboard/product-trends"
                                                    className="dropdown-item"
                                                >
                                                    Product Trends
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/dashboard/current-user"
                                                    className="dropdown-item"
                                                >
                                                    Current User
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/report"
                                        className={`nav-link fw-bold ${
                                            window.location.pathname ===
                                            "/dashboard/report"
                                                ? "active-tab bg-white"
                                                : "text-white"
                                        }`}
                                    >
                                        {t("container.tab_2")}
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/dashboard/feedbacks"
                                        className={`nav-link fw-bold ${
                                            window.location.pathname ===
                                            "/dashboard/feedbacks"
                                                ? "active-tab bg-white"
                                                : "text-white"
                                        }`}
                                    >
                                        Feedback
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/archives"
                                        className={`nav-link fw-bold ${
                                            window.location.pathname ===
                                            "/dashboard/archives"
                                                ? "active-tab bg-white"
                                                : "text-white"
                                        }`}
                                    >
                                        Archives
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/meeting-calendar"
                                        className={`nav-link fw-bold ${
                                            window.location.pathname ===
                                            "/dashboard/meeting-calendar"
                                                ? "active-tab bg-white"
                                                : "text-white"
                                        }`}
                                    >
                                        Schedule Meetings
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link
                                        to="/dashboard/users"
                                        className={`nav-link fw-bold ${
                                            routeName === "users"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        {t("container.tab_6")}
                                    </Link>
                                </li> */}
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/dashboard/food"
                                        className={`nav-link fw-bold ${
                                            routeName === "food"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                        aria-current="page"
                                    >
                                        {t("container.tab_7")}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/health"
                                        className={`nav-link fw-bold ${
                                            routeName === "health"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        {t("container.tab_8")}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/entertainment"
                                        className={`nav-link fw-bold ${
                                            routeName === "entertainment"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        {t("container.tab_9")}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/sport"
                                        className={`nav-link fw-bold ${
                                            routeName === "sport"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        {t("container.tab_10")}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/account"
                                        className={`nav-link fw-bold ${
                                            routeName === "account"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        {t("container.tab_11")}
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <hr />
                </nav>

                <main className="flex-grow-1">
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
                                to="/"
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
                                <div
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
                                </div>

                                <div className="d-flex mx-2 align-items-center">
                                    <h5
                                        className="d-none d-md-block fw-bold"
                                        style={{ color: "#00a7ad" }}
                                    >
                                        {t("container.welcome")}, {user?.name}
                                    </h5>
                                    <div className="dropdown mx-2">
                                        <a
                                            href="#"
                                            className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
                                            id="dropdownUser1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src={user?.avatar}
                                                alt={user?.name}
                                                className="rounded-circle me-2"
                                                width="32"
                                                height="32"
                                            />
                                        </a>
                                        <ul
                                            className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small shadow p-3"
                                            aria-labelledby="dropdownUser1"
                                        >
                                            <h5
                                                className="d-md-none py-2 fw-bold"
                                                style={{ color: "#00a7ad" }}
                                            >
                                                {t("container.welcome")},{" "}
                                                {user?.name}
                                            </h5>

                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/profile"
                                                >
                                                    {t("container.profile")}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/change-password"
                                                >
                                                    {t(
                                                        "container.change_password"
                                                    )}
                                                </Link>
                                            </li>

                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    type="button"
                                                    onClick={() =>
                                                        dispatch(logout())
                                                    }
                                                >
                                                    {t("container.logout_btn")}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="mx-5 pt-2 d-flex justify-content-end">
                        <a
                            href="https://login.live.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-2"
                            data-bs-toggle="tooltip"
                            data-bs-title="Mail"
                        >
                            <i
                                className="bi bi-envelope"
                                style={{ fontSize: 30 }}
                            ></i>
                        </a>
                        <a
                            href="http://slack.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-2"
                            data-bs-toggle="tooltip"
                            data-bs-title="Slack"
                        >
                            <i
                                className="bi bi-slack"
                                data-bs-toggle="tooltip"
                                data-bs-title="Slack"
                                style={{ fontSize: 30 }}
                            ></i>
                        </a>
                    </div>
                    {children}
                    <MainFooter dark={true} />
                </main>
            </div>
        </div>
    );
};

export default DashboardContainer;
