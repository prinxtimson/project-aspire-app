import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminDashboardContainer from "../components/AdminDashboardContainer";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AdminProfile = () => {
    const { t } = useTranslation(["profile"]);

    const { user, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <AdminDashboardContainer>
            <div className="container-fluid">
                <div
                    className="card my-5 m-auto p-2"
                    style={{ maxWidth: "440px" }}
                >
                    <div className="card-body">
                        <h1 className="card-title text-primary text-center">
                            Admin Profile
                        </h1>

                        <div className="form row g-3">
                            {!isLoading && (
                                <>
                                    <div className="py-2 position-relative">
                                        <img
                                            src={user?.avatar}
                                            alt={user?.name}
                                            className="rounded-circle mx-auto d-block"
                                            width={150}
                                            height={150}
                                        />
                                    </div>
                                    <div className="row g-3 align-items-center">
                                        <div className="col-auto">
                                            <p>Email</p>
                                        </div>
                                        <div className="col-auto">
                                            <h5 className="mb-3">
                                                {user?.email}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center">
                                        <div className="col-auto">
                                            <p>Full name</p>
                                        </div>
                                        <div className="col-auto">
                                            <h5 className="mb-3">
                                                {user?.name}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center">
                                        <div className="col-auto">
                                            <p>Username</p>
                                        </div>
                                        <div className="col-auto">
                                            <h5 className="mb-3">
                                                {user?.username}
                                            </h5>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="d-grid gap-2 col-12 py-3 mx-auto">
                            <Link
                                className={`btn btn-lg btn-outline-secondary`}
                                to="/admin/dashboard/manage-account/edit-profile"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardContainer>
    );
};

export default AdminProfile;
