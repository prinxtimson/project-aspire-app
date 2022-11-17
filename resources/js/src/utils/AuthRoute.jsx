import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
    const location = useLocation();
    const { user, tfa, isLoading } = useSelector((state) => state.auth);

    if (!isLoading && !user) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }

    if (!tfa) {
        return (
            <Navigate
                to="/two-factor-auth"
                state={{ path: location.pathname }}
            />
        );
    } else {
        return children;
    }
};

export default AuthRoute;
