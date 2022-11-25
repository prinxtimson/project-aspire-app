import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "../auth/authSlice";
import bookingService from "./bookingService";

const initialState = {
    bookings: [],
    booking: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// get bookings
export const getBookings = createAsyncThunk("booking/get", async (thunkAPI) => {
    try {
        return await bookingService.getBookings();
    } catch (err) {
        if (err.response.status === 401) {
            localStorage.removeItem("user");
            thunkAPI.dispatch(clearUser());
        }
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const getBookingsByPage = createAsyncThunk(
    "booking/get-by-page",
    async (page, thunkAPI) => {
        try {
            return await bookingService.getBookingsByPage(page);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("user");
                thunkAPI.dispatch(clearUser());
            }
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const getBooking = createAsyncThunk(
    "booking/get-single",
    async (id, thunkAPI) => {
        try {
            return await bookingService.getBooking(id);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("user");
                thunkAPI.dispatch(clearUser());
            }
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const scheduleBooking = createAsyncThunk(
    "booking/schedule",
    async (data, thunkAPI) => {
        try {
            return await bookingService.scheduleBooking(data);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("user");
                thunkAPI.dispatch(clearUser());
            }
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const rescheduleBooking = createAsyncThunk(
    "booking/reschedule",
    async (data, thunkAPI) => {
        try {
            return await bookingService.rescheduleBooking(data);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("user");
                thunkAPI.dispatch(clearUser());
            }
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const cancelBooking = createAsyncThunk(
    "booking/cancel",
    async (data, thunkAPI) => {
        try {
            const res = await bookingService.cancelBooking(data);

            return res;
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("user");
                thunkAPI.dispatch(clearUser());
            }
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const authSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.bookings = null;
            state.booking = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookings = action.payload;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBookingsByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBookingsByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookings = action.payload;
            })
            .addCase(getBookingsByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBooking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.booking = action.payload;
            })
            .addCase(getBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(scheduleBooking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(scheduleBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookings = [action.payload, ...state.bookings];
                state.message = "Meeting had been schedule successfuly";
            })
            .addCase(scheduleBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(rescheduleBooking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(rescheduleBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.booking = action.payload;
                state.message = "Meeting had been reschedule";
            })
            .addCase(rescheduleBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(cancelBooking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Booking had been cancel";
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = authSlice.actions;
export default authSlice.reducer;
