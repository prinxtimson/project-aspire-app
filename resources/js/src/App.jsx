import { useMemo, useState, Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { getCurrentUser, newNotification } from "./features/auth/authSlice";

import { FaRobot } from "react-icons/fa";
import Chatbot from "react-chatbot-kit";

import "react-chatbot-kit/build/main.css";
import "react-toastify/dist/ReactToastify.css";
import "flag-icon-css/css/flag-icons.min.css";

import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

import ReactGA from "react-ga";

import "./i18n";

import HomePage from "./pages/Home";
import RegistrationPage from "./pages/Registration";
import AboutUsPage from "./pages/AboutUs";
import ChangePasswordPage from "./pages/ChangePassword";
import ContactUsPage from "./pages/ContactUs";
import ForgotPasswordPage from "./pages/ForgotPassword";
import LoginPage from "./pages/Login";
import PrivacyPolicyPage from "./pages/PrivatePolicy";
import ProfilePage from "./pages/Profile";
import PurchasePage from "./pages/Purchase";
import ResetPasswordPage from "./pages/ResetPassword";
import SolutionPage from "./pages/Solution";
import SubscriptionPage from "./pages/Subscription";
import TermsAndConditionsPage from "./pages/TermsAndConditions";
import AuthRoute from "./utils/AuthRoute";
import GuestRoute from "./utils/GuestRoute";
import Dashboard from "./components/Dashboard";
import UsersTable from "./components/UsersTable";
import HealthChart from "./components/HealthChart";
import FoodChart from "./components/FoodChart";
import EntertainmentChart from "./components/EntertainmentChart";
import SubscriptionTable from "./components/SubscriptionTable";
import SportsChart from "./components/SportsChart";
import AdminDashboard from "./components/AdminDashboard";
import AdminReport from "./pages/AdminReport";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import ProductCatalogue from "./pages/ProductCatalogue";
import ProductsTrendChart from "./pages/ProductTrends";
import ProductsSalesChart from "./pages/ProductSales";
import CurrentUsers from "./pages/CurrentUsers";
import Fashion from "./pages/Fashion";
import FeedbackTable from "./pages/FeedbackTable";
import ArchiveFeedback from "./pages/ArchiveFeedback";
import MeetingCalendar from "./pages/MeetingCalendar";

ReactGA.initialize("UA-209541600-1");

const App = () => {
    const { t } = useTranslation(["translation"]);
    const [showChat, setShowChat] = useState(false);

    const toggleChatBot = () => setShowChat(!showChat);

    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            window.Echo.private(`App.Models.User.${user?.id}`).notification(
                (notification) => {
                    console.log(notification);

                    dispatch(newNotification(notification));
                }
            );
        }
    }, [user]);

    useMemo(() => {
        dispatch(getCurrentUser());
    }, []);

    return (
        <>
            {" "}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/register"
                        element={
                            <GuestRoute>
                                <RegistrationPage />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <GuestRoute>
                                <LoginPage />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/two-factor-auth"
                        element={<TwoFactorAuth />}
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <GuestRoute>
                                <ForgotPasswordPage />
                            </GuestRoute>
                        }
                    />
                    <Route path="/contact-us" element={<ContactUsPage />} />
                    <Route
                        path="/reset-password/:token"
                        element={
                            <GuestRoute>
                                <ResetPasswordPage />
                            </GuestRoute>
                        }
                    />
                    <Route path="/subscribe">
                        <Route path="" element={<SubscriptionPage />} />
                        <Route
                            path=":plan"
                            element={
                                <AuthRoute>
                                    <PurchasePage />
                                </AuthRoute>
                            }
                        />
                    </Route>
                    <Route path="/solution" element={<SolutionPage />} />
                    <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicyPage />}
                    />
                    <Route
                        path="/terms-and-conditions"
                        element={<TermsAndConditionsPage />}
                    />
                    <Route
                        path="/profile"
                        element={
                            <AuthRoute>
                                <ProfilePage />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/change-password"
                        element={
                            <AuthRoute>
                                <ChangePasswordPage />
                            </AuthRoute>
                        }
                    />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="dashboard">
                        <Route
                            path=""
                            element={
                                <AuthRoute>
                                    {!isLoading &&
                                    user?.roles[0]?.name === "admin" ? (
                                        <AdminDashboard />
                                    ) : (
                                        <Dashboard />
                                    )}
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="report"
                            element={
                                <AuthRoute>
                                    <AdminReport />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="product-trends"
                            element={
                                <AuthRoute>
                                    <ProductsTrendChart />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="product-sales"
                            element={
                                <AuthRoute>
                                    <ProductsSalesChart />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="meeting-calendar"
                            element={
                                <AuthRoute>
                                    <MeetingCalendar />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="current-user"
                            element={
                                <AuthRoute>
                                    <CurrentUsers />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="product-catalogue"
                            element={
                                <AuthRoute>
                                    <ProductCatalogue />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="health"
                            element={
                                <AuthRoute>
                                    <HealthChart />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="users"
                            element={
                                <AuthRoute>
                                    <UsersTable />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="food"
                            element={
                                <AuthRoute>
                                    <FoodChart />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="feedbacks"
                            element={
                                <AuthRoute>
                                    <FeedbackTable />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="archives"
                            element={
                                <AuthRoute>
                                    <ArchiveFeedback />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="entertainment"
                            element={
                                <AuthRoute>
                                    <EntertainmentChart />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="account"
                            element={
                                <AuthRoute>
                                    <SubscriptionTable />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="sport"
                            element={
                                <AuthRoute>
                                    <SportsChart />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="fashion"
                            element={
                                <AuthRoute>
                                    <Fashion />
                                </AuthRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer />
            <div
                className=""
                style={{
                    borderRadius: 5,
                    bottom: 40,
                    boxShadow: "5px 5px 13px rgba(91,81,81,.4)",
                    display: "flex",
                    justifyContent: "center",
                    margin: "40px 0",
                    position: "fixed",
                    right: 40,
                    zIndex: 6,
                }}
            >
                <div
                    className={!showChat ? "d-none" : ""}
                    style={{ position: "relative", width: 275 }}
                >
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                    />
                </div>
                <button
                    style={{
                        backgroundColor: "#1f3646",
                        border: "none",
                        borderRadius: 25,
                        bottom: 35,
                        height: 50,
                        position: "fixed",
                        right: 40,
                        width: 50,
                        zIndex: 10,
                    }}
                    onClick={toggleChatBot}
                >
                    <FaRobot color="#fff" size={30} />
                </button>
            </div>
        </>
    );
};

export default App;

const loadingMarkup = <div className="py-4 text-center"></div>;

if (document.getElementById("app")) {
    ReactDOM.render(
        <Suspense fallback={loadingMarkup}>
            <Provider store={store}>
                <App />
            </Provider>
        </Suspense>,
        document.getElementById("app")
    );
}
