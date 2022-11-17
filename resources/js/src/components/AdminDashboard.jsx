import { useEffect } from "react";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getSubscription } from "../features/plan/planSlice";
import DashboardContainer from "./DashboardContainer";
import ProductsSalesChart from "./ProductsSalesChart";
import ProductsTrendChart from "./ProductsTrendChart";
import { getUserType } from "../features/analytics/analyticsSlice";
import UserTypeChart from "./UserTypeChart";

const AdminDashboard = () => {
    const { t } = useTranslation(["dashboard"]);

    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.subscription);
    const { userType } = useSelector((state) => state.analytics);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        dispatch(getSubscription());
        dispatch(getUserType(7));
    }, []);

    return (
        <DashboardContainer>
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col col-md-6 mb-4">
                        <ProductsSalesChart products={data} />
                    </div>
                    <div className="col col-md-6 mb-4">
                        <ProductsTrendChart products={data} />
                    </div>
                    <div className="col col-md-6 ">
                        <UserTypeChart userType={userType} type={"pie2d"} />
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default AdminDashboard;
