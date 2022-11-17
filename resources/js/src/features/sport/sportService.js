import axios from "axios";

const API_URL = "/api/sport";

const getTennis = async () => {
    const res = await axios.get(`${API_URL}/tennis`);
    return res.data;
};

const getFootballById = async (id) => {
    const res = await axios.get(`${API_URL}/football/${id}`);
    return res.data;
};

const sportService = {
    getTennis,
    getFootballById,
};

export default sportService;
