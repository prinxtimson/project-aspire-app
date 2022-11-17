import axios from "axios";

const API_URL = "/api/content";

const getPrivacy = async () => {
    const res = await axios.get(`${API_URL}/privacy-policy`);
    return res.data;
};

const updateContent = async (data) => {
    const res = await axios.put(`${API_URL}/${data.id}`, data);
    return res.data;
};

const getTnC = async () => {
    const res = await axios.get(`${API_URL}/terms-and-conditions`);
    return res.data;
};

const contentService = {
    getPrivacy,
    getTnC,
    updateContent,
};

export default contentService;
