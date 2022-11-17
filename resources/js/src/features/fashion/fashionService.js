import axios from "axios";

const API_URL = "/api/fashion";

const getGender = async () => {
    const res = await axios.get(`${API_URL}/gender`);

    return res.data;
};

const getSeason = async () => {
    const res = await axios.get(`${API_URL}/season`);

    return res.data;
};

const getCategory = async () => {
    const res = await axios.get(`${API_URL}/category`);

    return res.data;
};

const fashionService = {
    getGender,
    getSeason,
    getCategory,
};

export default fashionService;
