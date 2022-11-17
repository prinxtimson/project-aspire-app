import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "../auth/authSlice";
import planService from "./planService";

const initialState = {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getSubscription = createAsyncThunk(
    "plan/get-subscription",
    async (thunkAPI) => {
        try {
            return await planService.getSubscription();
        } catch (err) {
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

export const savePayment = createAsyncThunk(
    "plan/save-payment",
    async (data, thunkAPI) => {
        try {
            return await planService.savePayment(data);
        } catch (err) {
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

export const updateSubscription = createAsyncThunk(
    "plan/update",
    async (data, thunkAPI) => {
        try {
            return await planService.updateSubscription(data);
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

export const cancelSubscription = createAsyncThunk(
    "plan/cancel",
    async (data, thunkAPI) => {
        try {
            return await planService.cancelSubscription(data);
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

export const subscriptionSlice = createSlice({
    name: "plan",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearSubscription: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubscription.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSubscription.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getSubscription.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(savePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(savePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(savePayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(cancelSubscription.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(cancelSubscription.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "subscription cancel successful";
            })
            .addCase(cancelSubscription.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
