import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
    clearSubscription,
    getAllSubscription,
    deactivateSubscription,
    activateSubscription,
    deleteSubscription,
    reset,
} from "../features/plan/planSlice";

const SubscriptionTable = () => {
    const { t } = useTranslation(["dashboard"]);

    const dispatch = useDispatch();
    const { subscriptions, isLoading, isError, isSuccess, message } =
        useSelector((state) => state.subscription);

    useEffect(() => {
        dispatch(getAllSubscription());

        return () => dispatch(clearSubscription());
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
    }, [isSuccess, isError]);

    const handleDeletePlan = (id) => {
        if (
            window.confirm(
                `You are about to delete subscription with userID ${id}, this can't be undone.`
            )
        ) {
            dispatch(deleteSubscription(id));
        }
    };

    const handleActivatePlan = (id) => dispatch(activateSubscription(id));

    const handleDeactivatePlan = (id) => dispatch(deactivateSubscription(id));

    return (
        <div className="container p-4">
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        {t("subscription_table.th_0")}
                                    </th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">
                                        {t("subscription_table.th_1")}
                                    </th>
                                    <th scope="col">
                                        {t("subscription_table.th_2")}
                                    </th>
                                    <th scope="col">
                                        {t("subscription_table.th_3")}
                                    </th>
                                    <th scope="col">
                                        {t("subscription_table.th_4")}
                                    </th>
                                    <th scope="col">
                                        {t("subscription_table.th_5")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isLoading && subscriptions.length > 0 ? (
                                    subscriptions.map((subscription) => (
                                        <tr
                                            key={subscription.id}
                                            className="align-middle"
                                        >
                                            <th scope="row">
                                                {subscription.id}
                                            </th>
                                            <td>{subscription.user?.name}</td>
                                            <td>
                                                <Moment format="lll">
                                                    {
                                                        subscription.data
                                                            ?.start_time
                                                    }
                                                </Moment>
                                            </td>
                                            <td>
                                                <Moment format="lll">
                                                    {
                                                        subscription.data
                                                            ?.billing_info
                                                            ?.next_billing_time
                                                    }
                                                </Moment>
                                            </td>
                                            <td>{subscription.status}</td>
                                            <td>
                                                <Moment>
                                                    {subscription.created_at}
                                                </Moment>
                                            </td>
                                            <td>
                                                <div className="d-grid gap-4 d-md-block">
                                                    <button
                                                        className="btn btn-sm btn-outline-warning"
                                                        type="button"
                                                        disabled={
                                                            subscription.status ==
                                                            "CANCELED"
                                                        }
                                                        onClick={() =>
                                                            subscription.status ===
                                                            "ACTIVE"
                                                                ? handleDeactivatePlan(
                                                                      subscription.id
                                                                  )
                                                                : handleActivatePlan(
                                                                      subscription.id
                                                                  )
                                                        }
                                                    >
                                                        {subscription.status ===
                                                        "ACTIVE"
                                                            ? "Deactivate"
                                                            : "Activate"}
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm text-white"
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeletePlan(
                                                                subscription.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>
                                            <strong>
                                                {t(
                                                    "subscription_table.table_text"
                                                )}
                                            </strong>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionTable;
