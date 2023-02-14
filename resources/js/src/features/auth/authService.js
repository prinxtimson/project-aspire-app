import axios from "axios";

const API_URL = "/api";

const register = async (userData) => {
    const res = await axios.post(`${API_URL}/register`, userData);

    if (res.data) {
        localStorage.setItem("elintx-user", JSON.stringify(res.data.user));
    }

    return res.data;
};

const registerAdmin = async (userData) => {
    const res = await axios.post(`${API_URL}/admin-register`, userData);

    return res.data;
};

const getCurrentUser = async () => {
    const res = await axios.get(`${API_URL}/me`);

    if (res.data) {
        localStorage.setItem("elintx-user", JSON.stringify(res.data.user));
    }

    return res.data;
};

const logout = async () => {
    await axios.post("/logout");
    localStorage.removeItem("elintx-user");
    localStorage.removeItem("elintx-access-token");
    localStorage.removeItem("elintx-2fa");
};

const login = async (userData) => {
    await axios.get(`/sanctum/csrf-cookie`);
    const res = await axios.post(`${API_URL}/login`, userData);

    if (res.data) {
        localStorage.setItem("elintx-user", JSON.stringify(res.data.user));
        localStorage.setItem(
            "elintx-access-token",
            JSON.stringify(res.data.token)
        );
    }

    return res.data;
};

const forgotPass = async (email) => {
    const res = await axios.post(API_URL + "/forgot-password", email);

    return res.data;
};

const updateSetting = async (data) => {
    const res = await axios.put(API_URL + "/settings/update", data);

    return res.data;
};

const resetPass = async (data) => {
    const res = await axios.post(API_URL + "/reset-password", data);

    return res.data;
};

const changePass = async (data) => {
    const res = await axios.put(API_URL + "/change-password", data);

    return res.data;
};

const updateUser = async (data) => {
    const res = await axios.post(API_URL + "/update", data);

    return res.data;
};

const verifyCode = async (data) => {
    const res = await axios.post("/two-factor-auth", data);
    if (res.data) {
        localStorage.setItem("elintx-2fa", JSON.stringify(true));
    }
    return res.data;
};

const markNotification = async () => {
    const res = await axios.get(API_URL + "/mark-notification");

    return res.data;
};

const resendCode = async () => {
    const res = await axios.get("/two-factor-auth/resend");

    return res.data;
};

const resendVerification = async () => {
    const res = await axios.post(`${API_URL}/email/verification-notification`);
    return res.data;
};

const deleteAccount = async () => {
    const res = await axios.delete(`/delete-account`);

    return res.data;
};

const deactivateUser = async (id) => {
    const res = await axios.put(`${API_URL}/users/disable/${id}`);

    return res.data;
};

const activateUser = async (id) => {
    const res = await axios.put(`${API_URL}/users/enable/${id}`);

    return res.data;
};

const deleteUser = async (id) => {
    const res = await axios.delete(`${API_URL}/users/delete/${id}`);

    return res.data;
};

const authService = {
    register,
    registerAdmin,
    logout,
    login,
    updateUser,
    forgotPass,
    resetPass,
    changePass,
    resendVerification,
    getCurrentUser,
    verifyCode,
    resendCode,
    deleteAccount,
    markNotification,
    updateSetting,
    deleteUser,
    activateUser,
    deactivateUser,
};

export default authService;
