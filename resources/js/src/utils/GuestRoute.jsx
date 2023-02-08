import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ children }) => {
    const location = useLocation();
    const { user, isLoading } = useSelector((state) => state.auth);

    const redirectPath = location.state?.path || "../two-factor-auth";

    if (!isLoading && user) {
        return <Navigate to={redirectPath} />;
    }

    return children;
};

export default GuestRoute;
