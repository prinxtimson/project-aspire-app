import axios from "axios";

const API_URL = "/api/subscription";

const getSubscription = async () => {
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

const cancelSubscription = async (data) => {
    const res = await axios.post(`${API_URL}/${data.id}/cancel`, data);
    return res.data;
};

const subscriptionService = {
    getSubscription,
    savePayment,
    updateSubscription,
    cancelSubscription,
};

export default subscriptionService;
