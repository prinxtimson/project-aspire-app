import axios from "axios";

const API_URL = "/api/analytics";

const getAnalytics = async (days = 7) => {
    const res = await axios.get(`${API_URL}/visit/${days}`);

    return res.data;
};

const getUserType = async (days = 7) => {
    const res = await axios.get(`${API_URL}/user-type/${days}`);

    return res.data;
};

const getPageVisit = async (days = 7) => {
    const res = await axios.get(`${API_URL}/most/${days}`);

    return res.data;
};

const getBrowser = async (days = 7) => {
    const res = await axios.get(`${API_URL}/browser/${days}`);

    return res.data;
};

const getDuration = async (days = 7) => {
    const res = await axios.get(`${API_URL}/time/${days}`);

    return res.data;
};

const getCountry = async (days = 7) => {
    const res = await axios.get(`${API_URL}/country/${days}`);

    return res.data;
};

const getBounceRate = async (days = 7) => {
    const res = await axios.get(`${API_URL}/bounce/${days}`);

    return res.data;
};

const analyticsService = {
    getAnalytics,
    getBounceRate,
    getCountry,
    getBrowser,
    getDuration,
    getPageVisit,
    getUserType,
};

export default analyticsService;
