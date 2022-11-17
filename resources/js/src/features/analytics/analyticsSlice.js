import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "../auth/authSlice";
import analyticsService from "./analyticsService";

const initialState = {
    visit: null,
    page: null,
    userType: null,
    browser: null,
    country: null,
    duration: null,
    bounce: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getAnalytics = createAsyncThunk(
    "analytics/get-analytics",
    async (days, thunkAPI) => {
        try {
            return await analyticsService.getAnalytics(days);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("elintx-user");
                localStorage.removeItem("elintx-2fa");
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

export const getUserType = createAsyncThunk(
    "analytics/get-user-type",
    async (days, thunkAPI) => {
        try {
            return await analyticsService.getUserType(days);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("elintx-user");
                localStorage.removeItem("elintx-2fa");
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

export const getPageVisit = createAsyncThunk(
    "analytics/get-page-visit",
    async (days, thunkAPI) => {
        try {
            return await analyticsService.getPageVisit(days);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("elintx-user");
                localStorage.removeItem("elintx-2fa");
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

export const getBrowser = createAsyncThunk(
    "analytics/get-browser",
    async (days, thunkAPI) => {
        try {
            return await analyticsService.getBrowser(days);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("elintx-user");
                localStorage.removeItem("elintx-2fa");
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

export const getDuration = createAsyncThunk(
    "analytics/get-duration",
    async (days, thunkAPI) => {
        try {
            return await analyticsService.getDuration(days);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("elintx-user");
                localStorage.removeItem("elintx-2fa");
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

export const getCountry = createAsyncThunk(
    "analytics/get-country",
    async (days, thunkAPI) => {
        try {
            return await analyticsService.getCountry(days);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("elintx-user");
                localStorage.removeItem("elintx-2fa");
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

export const getBounceRate = createAsyncThunk(
    "analytics/get-bounce-rate",
    async (days, thunkAPI) => {
        try {
            return await analyticsService.getBounceRate(days);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("elintx-user");
                localStorage.removeItem("elintx-2fa");
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

export const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearAnalytics: (state) => {
            state.visit = null;
            state.page = null;
            state.userType = null;
            state.bounce = null;
            state.browser = null;
            state.country = null;
            state.duration = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAnalytics.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAnalytics.fulfilled, (state, action) => {
                state.isLoading = false;
                state.visit = action.payload;
            })
            .addCase(getAnalytics.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserType.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserType.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userType = action.payload;
            })
            .addCase(getUserType.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getPageVisit.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPageVisit.fulfilled, (state, action) => {
                state.isLoading = false;
                state.page = action.payload;
            })
            .addCase(getPageVisit.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBrowser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrowser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.browser = action.payload;
            })
            .addCase(getBrowser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBounceRate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBounceRate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bounce = action.payload;
            })
            .addCase(getBounceRate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDuration.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDuration.fulfilled, (state, action) => {
                state.isLoading = false;
                state.duration = action.payload;
            })
            .addCase(getDuration.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCountry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCountry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.country = action.payload;
            })
            .addCase(getCountry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
