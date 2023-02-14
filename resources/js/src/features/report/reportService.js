import axios from "axios";

const API_URL = "/api/report";

const getReports = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

const generateReport = async (data) => {
    const res = await axios.post(`${API_URL}`, data);
    return res.data;
};

const archivedReport = async (id) => {
    const res = await axios.put(`${API_URL}/archived/${id}`);
    return res.data;
};

const trashedReport = async (id) => {
    const res = await axios.put(`${API_URL}/trashed/${id}`);
    return res.data;
};

const restoredReport = async (id) => {
    const res = await axios.delete(`${API_URL}/restored/${id}`);
    return res.data;
};

const deleteReport = async (id) => {
    const res = await axios.post(`${API_URL}/delete/${id}`);
    return res.data;
};

const reportService = {
    getReports,
    generateReport,
    archivedReport,
    restoredReport,
    trashedReport,
    deleteReport,
};

export default reportService;
