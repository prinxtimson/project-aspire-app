import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardContainer from "../components/DashboardContainer";
import UsersTable from "../components/UsersTable";
import HealthChat from "../components/HealthChart";
import FoodChart from "../components/FoodChart";
import SubscriptionTable from "../components/SubscriptionTable";
import ReactGA from "react-ga";
import EntertainmentChart from "../components/EntertainmentChart";
import AdminDashboard from "../components/AdminDashboard";
import SportsChart from "../components/SportsChart";
import DashboardIndex from "../components/Dashboard";
import PageVisitedChart from "../components/PageVisitedChart";
import DurationChart from "../components/DurationChart";
import BounceRateChart from "../components/BounceRateChart";

const Dashboard = () => {
    const { routeName } = useParams();

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    const renderComponent = (param) => {
        switch (param) {
            case "users":
                return <UsersTable />;
            case "health":
                return <HealthChat />;
            case "food":
                return <FoodChart />;
            case "entertainment":
                return <EntertainmentChart />;
            case "account":
                return <SubscriptionTable />;
            case "sport":
                return <SportsChart />;
            case "visit":
                return <AdminDashboard />;
            case "page-visited":
                return <PageVisitedChart />;
            case "duration":
                return <DurationChart />;
            case "bounce-rate":
                return <BounceRateChart />;
            default:
                return <DashboardIndex />;
        }
    };
    return (
        <DashboardContainer>
            <div className="container-fluid">{renderComponent(routeName)}</div>
        </DashboardContainer>
    );
};

export default Dashboard;
