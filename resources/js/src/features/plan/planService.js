import axios from "axios";

const API_URL = "/api/subscription";

const getAllSubscription = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

const savePayment = async (data) => {
    const res = await axios.post(`${API_URL}/save-payment`, data);
    return res.data;
};

const updateSubscription = async (data) => {
    const res = await axios.put(`${API_URL}/${data.id}`, data);
    return res.data;
};

const activateSubscription = async (id) => {
    const res = await axios.put(`${API_URL}/activate/${id}`);
    return res.data;
};

const deactivateSubscription = async (id) => {
    const res = await axios.put(`${API_URL}/deactivate/${id}`);
    return res.data;
};

const deleteSubscription = async (id) => {
    const res = await axios.delete(`${API_URL}/delete/${id}`);
    return res.data;
};

const cancelSubscription = async (data) => {
    const res = await axios.post(`${API_URL}/${data.id}/cancel`, data);
    return res.data;
};

const subscriptionService = {
    getAllSubscription,
    savePayment,
    updateSubscription,
    cancelSubscription,
    activateSubscription,
    deactivateSubscription,
    deleteSubscription,
};

export default subscriptionService;
