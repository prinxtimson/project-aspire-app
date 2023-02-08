import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../features/auth/authSlice";

const AuthRoute = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { user, tfa, isLoading } = useSelector((state) => state.auth);

    if (!isLoading && !user) {
        return (
            <Navigate to="/admin/login" state={{ path: location.pathname }} />
        );
    }

    if (!isLoading && user && !tfa) {
        return (
            <Navigate
                to="../two-factor-auth"
                state={{ path: location.pathname }}
            />
        );
    }

    if (!isLoading && user && !user.email_verified_at) {
        return (
            <Navigate to="/email/verify" state={{ path: location.pathname }} />
        );
    }

    return children;
};

export default AuthRoute;
