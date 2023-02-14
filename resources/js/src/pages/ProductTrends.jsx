import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useTranslation } from "react-i18next";
import { getAllSubscription } from "../features/plan/planSlice";
import DashboardContainer from "../components/DashboardContainer";
import ProductsTrendChart from "../components/ProductsTrendChart";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const ProductTrends = () => {
    const { t } = useTranslation(["dashboard"]);

    const dispatch = useDispatch();
    const { subscriptions } = useSelector((state) => state.subscription);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        dispatch(getAllSubscription());
    }, []);

    return (
        <DashboardContainer>
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col mb-4">
                        <ProductsTrendChart
                            products={subscriptions}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default ProductTrends;
