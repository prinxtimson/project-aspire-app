import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "../auth/authSlice";
import planService from "./planService";

const initialState = {
    data: null,
    subscriptions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getAllSubscription = createAsyncThunk(
    "plan/get-subscriptions",
    async (thunkAPI) => {
        try {
            return await planService.getAllSubscription();
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

export const deleteSubscription = createAsyncThunk(
    "plan/delete-subscription",
    async (id, thunkAPI) => {
        try {
            return await planService.deleteSubscription(id);
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                localStorage.removeItem("elintx-user");
                localStorage.removeItem("elintx-access-token");
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

export const deactivateSubscription = createAsyncThunk(
    "plan/deactivate-subscription",
    async (id, thunkAPI) => {
        try {
            return await planService.deactivateSubscription(id);
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                localStorage.removeItem("elintx-user");
                localStorage.removeItem("elintx-access-token");
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

export const activateSubscription = createAsyncThunk(
    "plan/activate-subscription",
    async (id, thunkAPI) => {
        try {
            return await planService.activateSubscription(id);
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                localStorage.removeItem("elintx-user");
                localStorage.removeItem("elintx-access-token");
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
            state.subscriptions = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSubscription.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllSubscription.fulfilled, (state, action) => {
                state.isLoading = false;
                state.subscriptions = action.payload;
            })
            .addCase(getAllSubscription.rejected, (state, action) => {
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
            })
            .addCase(activateSubscription.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(activateSubscription.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(activateSubscription.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deactivateSubscription.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deactivateSubscription.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(deactivateSubscription.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteSubscription.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSubscription.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(deleteSubscription.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
