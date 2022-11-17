import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MainFooter from "./MainFooter";
import { logout, reset } from "../features/auth/authSlice";
import { useTranslation } from "react-i18next";

const DashboardContainer = ({ children }) => {
    const { t } = useTranslation(["dashboard"]);
    const { routeName } = useParams();
    const dropBtnRef = useRef(null);
    const dropdownRef = useRef(null);
    const dropBellRef = useRef(null);
    const [searchResult, setSearchResult] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const dispatch = useDispatch();
    const { user, isLoading, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);
    }, [isError]);

    const handleToggle = () => setIsActive(!isActive);

    return (
        <div className="flex-grow-1 d-flex flex-column">
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
                                        to="/dashboard/product-catalogue"
                                        className={`nav-link fw-bold ${
                                            window.location.pathname ===
                                            "/dashboard/product-catalogue"
                                                ? "active-tab bg-white"
                                                : "text-white"
                                        }`}
                                    >
                                        Product Catalogue
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
                                    <input
                                        className="form-control"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        onFocus={() =>
                                            dropBtnRef.current.click()
                                        }
                                        onBlur={() =>
                                            dropBtnRef.current.click()
                                        }
                                    />
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                        style={{ minWidth: 320 }}
                                    >
                                        {searchResult.length === 0 ? (
                                            <li>
                                                <p className="px-3">
                                                    {t("container.no_result")}
                                                </p>
                                            </li>
                                        ) : (
                                            searchResult.map(
                                                (result, index) => (
                                                    <li
                                                        key={index}
                                                        className=""
                                                    >
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            {t(
                                                                "container.action"
                                                            )}
                                                        </a>
                                                    </li>
                                                )
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div className="me-2 dropdown-center">
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
                                                0
                                                <span className="visually-hidden">
                                                    unread messages
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="dropdownMenuNotifcation"
                                        style={{ minWidth: 320 }}
                                    >
                                        <li>
                                            <p className="px-3">
                                                No new notification
                                            </p>
                                        </li>
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
                    {children}
                    <MainFooter />
                </main>
            </div>
        </div>
    );
};

export default DashboardContainer;
