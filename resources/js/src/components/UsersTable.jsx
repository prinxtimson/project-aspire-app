import { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
    deactivateUser,
    activateUser,
    deleteUser,
    reset,
} from "../features/auth/authSlice";

const axios = window.axios;

const UsersTable = () => {
    const { t } = useTranslation(["dashboard"]);
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    const dispatch = useDispatch();

    const { user, isSuccess, message, isError } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        getUsers();
    }, []);

    useEffect(() => {
        if (isSuccess) {
            toast.success(message);
            getUsers();
            dispatch(reset());
        }

        if (isError) {
            toast.error(message);
            dispatch(reset());
        }

        if (alert && alert.type == "danger") {
            toast.error(alert.msg);
            setAlert(null);
        }
    }, [isSuccess, isError, alert]);

    const getUsers = async () => {
        try {
            const res = await axios.get("/api/users");

            setUsers(res.data);
            setData(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err.response);
            if (err.response.status == 500) {
                return setAlert({
                    msg: "Server errror, please try again.",
                    type: "danger",
                });
            }

            setAlert({ msg: err.response.data.message, type: "danger" });
        }
    };

    const getTrashedUser = () => {
        setUsers(data.filter((item) => item.deleted_at));
    };

    const getAllUsers = () => {
        setUsers(data);
    };

    const handleDeleteUser = (id) => {
        if (
            window.confirm(
                `You are about to delete user with userID ${id}, this can't be undone.`
            )
        ) {
            dispatch(deleteUser(id));
        }
    };

    const handleActivateUser = (id) => dispatch(activateUser(id));

    const handleDeactivateUser = (id) => dispatch(deactivateUser(id));

    return (
        <div className="container py-5">
            {loading ? (
                <p className="py-5">{t("users_table.loading")}........</p>
            ) : (
                <div className="card">
                    <div className="card-body table-responsive">
                        <div className="d-flex py-3">
                            <div className="flex-shrink-0">
                                <a href="#" type="button" onClick={getAllUsers}>
                                    {t("users_table.all_users")}
                                </a>
                                <span>{`(${data.length})`}</span>
                            </div>
                            <div className="flex-shrink-0 mx-3">
                                <a
                                    href="#"
                                    type="button"
                                    onClick={getTrashedUser}
                                >
                                    {t("users_table.trashed_users")}
                                </a>
                                <span>{`(${
                                    data.filter((item) => item.deleted_at)
                                        .length
                                })`}</span>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{t("users_table.th_1")}</th>
                                    <th scope="col">{t("users_table.th_2")}</th>
                                    <th scope="col">{t("users_table.th_3")}</th>
                                    <th scope="col">{t("users_table.th_4")}</th>
                                    <th scope="col">{t("users_table.th_5")}</th>
                                    <th scope="col">{t("users_table.th_6")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading &&
                                    users.map((currentUser) => (
                                        <tr
                                            key={currentUser.id}
                                            className="align-middle"
                                        >
                                            <th scope="row">
                                                {currentUser.id}
                                            </th>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="">
                                                        <img
                                                            src={
                                                                currentUser.avatar
                                                            }
                                                            alt={
                                                                currentUser.name
                                                            }
                                                            className="rounded-circle"
                                                            width={40}
                                                            height={40}
                                                        />
                                                    </div>
                                                    <div className="flex-shink-0 mx-2">
                                                        <p className="mb-0">
                                                            {
                                                                currentUser.username
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0">
                                                    {currentUser.name}
                                                </p>
                                            </td>
                                            <td>{currentUser.email}</td>
                                            <td>
                                                {currentUser.roles[0]?.name}
                                            </td>
                                            <td>
                                                {currentUser.deleted_at
                                                    ? "deactivated"
                                                    : "activated"}
                                            </td>
                                            <td>
                                                <div className="d-grid gap-4 d-md-block">
                                                    <button
                                                        className="btn btn-sm btn-outline-warning"
                                                        type="button"
                                                        disabled={
                                                            currentUser.id ==
                                                            user?.id
                                                        }
                                                        onClick={() =>
                                                            currentUser.deleted_at
                                                                ? handleActivateUser(
                                                                      currentUser.id
                                                                  )
                                                                : handleDeactivateUser(
                                                                      currentUser.id
                                                                  )
                                                        }
                                                    >
                                                        {currentUser.deleted_at
                                                            ? "Activate"
                                                            : "Deactivate"}
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm text-white"
                                                        type="button"
                                                        disabled={
                                                            currentUser.id ==
                                                            user?.id
                                                        }
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                currentUser.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersTable;
