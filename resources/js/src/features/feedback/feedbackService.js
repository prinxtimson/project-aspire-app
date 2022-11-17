import axios from "axios";

const API_URL = "/api/feedbacks";

const getFeedbacks = async () => {
    const res = await axios.get(API_URL);

    return res.data;
};

const getFeedback = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const sendFeedback = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const feedbackService = {
    getFeedbacks,
    getFeedback,
    sendFeedback,
};

export default feedbackService;
