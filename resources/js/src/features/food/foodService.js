import axios from "axios";

const API_URL = "/api/food-and-drinks";

const getFood = async (food) => {
    const res = await axios.get(`${API_URL}/${food}`);
    return res.data;
};

const foodService = {
    getFood,
};

export default foodService;
