import axios from "axios";

const API_URL = "/api/health";

const getHistory = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

const getHealthWorld = async () => {
    const res = await axios.get(`${API_URL}/world`);
    return res.data;
};

const getHealthByCountry = async (country = "GB") => {
    const res = await axios.get(`${API_URL}/${country}`);
    return res.data;
};

const healthService = {
    getHistory,
    getHealthWorld,
    getHealthByCountry,
};

export default healthService;
