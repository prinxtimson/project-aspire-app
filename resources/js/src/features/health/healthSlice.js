import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "../auth/authSlice";
import healthService from "./healthService";

const initialState = {
    history: null,
    world: null,
    country: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getHistory = createAsyncThunk(
    "health/get-history",
    async (thunkAPI) => {
        try {
            return await healthService.getHistory();
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

export const getHealthWorld = createAsyncThunk(
    "health/get-world",
    async (thunkAPI) => {
        try {
            return await healthService.getHealthWorld();
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

export const getHealthByCountry = createAsyncThunk(
    "health/get-country",
    async (country, thunkAPI) => {
        try {
            return await healthService.getHealthByCountry(country);
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

export const healthSlice = createSlice({
    name: "health",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearHealth: (state) => {
            state.history = null;
            state.world = null;
            state.country = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHistory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.history = action.payload;
            })
            .addCase(getHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getHealthWorld.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHealthWorld.fulfilled, (state, action) => {
                state.isLoading = false;
                state.world = action.payload;
            })
            .addCase(getHealthWorld.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getHealthByCountry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHealthByCountry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.country = action.payload;
            })
            .addCase(getHealthByCountry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearHealth } = healthSlice.actions;
export default healthSlice.reducer;
