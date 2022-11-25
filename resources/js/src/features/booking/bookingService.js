import axios from "axios";

const API_URL = "/api/bookings";

const getBookings = async () => {
    const res = await axios.get(API_URL + "/all");

    return res.data;
};

const getBookingsByPage = async (page) => {
    const res = await axios.get("/api/bookings?page=" + page);

    return res.data;
};

const getBooking = async (id) => {
    const res = await axios.get(API_URL + "/" + id);

    return res.data;
};

const scheduleBooking = async (data) => {
    const res = await axios.post(API_URL, data);

    return res.data;
};

const rescheduleBooking = async (formData) => {
    const res = await axios.put(API_URL + "/" + formData.id, formData);

    return res.data;
};

const cancelBooking = async (formData) => {
    const res = await axios.post(`${API_URL}/${formData.id}/cancel`, formData);

    return res.data;
};

const bookingService = {
    getBookings,
    getBooking,
    getBookingsByPage,
    scheduleBooking,
    rescheduleBooking,
    cancelBooking,
};

export default bookingService;
