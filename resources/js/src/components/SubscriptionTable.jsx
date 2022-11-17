import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";
import { clearSubscription, getSubscription } from "../features/plan/planSlice";
import DashboardContainer from "./DashboardContainer";

const SubscriptionTable = () => {
    const { t } = useTranslation(["dashboard"]);

    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.subscription);

    useEffect(() => {
        dispatch(getSubscription());

        return () => dispatch(clearSubscription());
    }, []);

    return (
        <DashboardContainer>
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
                                    {!isLoading && data.length > 0 ? (
                                        data.map((subscription) => (
                                            <tr
                                                key={subscription.id}
                                                className="align-middle"
                                            >
                                                <th scope="row">
                                                    {subscription.id}
                                                </th>
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
                                                <td>
                                                    {subscription.data?.status}
                                                </td>
                                                <td>
                                                    <Moment>
                                                        {
                                                            subscription.created_at
                                                        }
                                                    </Moment>
                                                </td>
                                                <td>
                                                    {/*
                                                <div className="d-flex">
                                                    <div className="">
                                                        <button
                                                            className="btn"
                                                            type="button"
                                                        ></button>
                                                    </div>
                                                    <div className="flex-shrink-0 mx-2">
                                                        <button
                                                            className="btn btn-danger btn-sm text-white"
                                                            type="button"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                                */}
                                                    <button
                                                        className="btn btn-danger btn-sm text-white"
                                                        type="button"
                                                    >
                                                        {t(
                                                            "subscription_table.btn_text"
                                                        )}
                                                    </button>
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
        </DashboardContainer>
    );
};

export default SubscriptionTable;
