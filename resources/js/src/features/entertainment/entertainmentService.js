import axios from "axios";

const API_URL = "/api/entertainment";

const getVideo = async () => {
    const res = await axios.get(`${API_URL}/video`);
    return res.data;
};

const entertainmentService = {
    getVideo,
};

export default entertainmentService;
