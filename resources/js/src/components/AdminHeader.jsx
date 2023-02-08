import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, markNotification } from "../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import searchData from "../utils/searchData";
import SearchDialog from "./SearchDialog";
import Moment from "react-moment";

const AdminHeader = () => {
    const { t } = useTranslation(["dashboard"]);
    const dropBellRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [searchResult, setSearchResult] = useState([]);

    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        const notificationMenu = document.getElementById("notificationMenu2");
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

    const updateWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    return (
        <nav className="navbar navbar-expand-xl navbar-light py-0">
            <SearchDialog
                searchResult={searchResult}
                handleOnClose={handleOnClose}
            />
            <div className="container">
                <Link className="navbar-brand" to="/admin">
                    <img
                        src="/images/Elint_x.png"
                        alt="Elint X"
                        width="69"
                        height="68"
                    />
                </Link>
                <div
                    className="collapse navbar-collapse d-none d-xl-block"
                    id="navbarNav"
                >
                    <ul className="navbar-nav flex-grow-1">
                        {user && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white fw-bold"
                                    to="/dashboard"
                                >
                                    {t("header.nav_link_4")}
                                </Link>
                            </li>
                        )}
                    </ul>
                    {!user && (
                        <ul className="navbar-nav flex-row flex-wrap">
                            <li className="nav-item col-6 col-lg-auto">
                                <Link
                                    className="nav-link text-primary"
                                    to="/admin/login"
                                >
                                    {t("header.nav_link_6")}
                                </Link>
                            </li>
                            <li className="nav-item col-6 col-lg-auto">
                                <Link
                                    className="nav-link text-primary"
                                    to="/admin/register"
                                >
                                    {t("header.nav_link_5")}
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
                {user ? (
                    <div className="flex-shrink-0 d-flex justify-content-end">
                        <div className="me-2 ">
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
                            id="notificationMenu2"
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
                                    className="btn"
                                    onClick={() => dropBellRef.current.click()}
                                >
                                    <i
                                        className="bi bi-bell-fill"
                                        style={{ fontSize: 20 }}
                                    ></i>

                                    <span
                                        className="position-absolute  translate-middle badge rounded-pill bg-danger"
                                        style={{ top: 12, left: 38 }}
                                    >
                                        {user?.unread_notifications.length || 0}
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
                                                            Profile update
                                                        </h5>
                                                        <small>
                                                            <Moment fromNow>
                                                                {
                                                                    item.created_at
                                                                }
                                                            </Moment>
                                                        </small>
                                                    </div>

                                                    <p className="">
                                                        Profile was updated
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
                                                            <Moment fromNow>
                                                                {
                                                                    item.created_at
                                                                }
                                                            </Moment>
                                                        </small>
                                                    </div>

                                                    <p className="">
                                                        Report had been shared
                                                        with {item.data.email}
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
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                ) : (
                    <div className="flex-shrink-0 d-flex justify-content-end">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                )}
                <div
                    className={`collapse d-xl-none ${
                        screenWidth < 1200 ? "navbar-collapse" : null
                    }`}
                    id="navbarNav"
                >
                    <ul className="navbar-nav flex-grow-1">
                        {user && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white fw-bold"
                                    to="/dashboard"
                                >
                                    {t("header.nav_link_4")}
                                </Link>
                            </li>
                        )}
                    </ul>
                    {!user && (
                        <div className="d-grid gap-2 d-md-block col-md-3 col-sm-6 col-xs-12">
                            <Link
                                className="nav-link text-primary"
                                to="/admin/login"
                            >
                                {t("header.nav_link_6")}
                            </Link>
                            <span className=" mx-2" />
                            <Link
                                className="nav-link text-primary"
                                to="/admin/register"
                            >
                                {t("header.nav_link_5")}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AdminHeader;
