import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import feedbackService from "./feedbackService";

const initialState = {
    feedbacks: null,
    feedback: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// get feedbacks
export const getFeedbacks = createAsyncThunk(
    "feedback/get",
    async (thunkAPI) => {
        try {
            return await feedbackService.getFeedbacks();
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

export const getFeedback = createAsyncThunk(
    "feedback/get-single",
    async (id, thunkAPI) => {
        try {
            return await feedbackService.getFeedback(id);
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

export const sendFeedback = createAsyncThunk(
    "feedback/send",
    async (data, thunkAPI) => {
        try {
            await feedbackService.sendFeedback(data);
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

export const authSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.feedbacks = null;
            state.feedback = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedbacks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeedbacks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedbacks = action.payload;
            })
            .addCase(getFeedbacks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getFeedback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedback = action.payload;
            })
            .addCase(getFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(sendFeedback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.feedback = action.payload;
                state.message = "feedback had been received";
            })
            .addCase(sendFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = authSlice.actions;
export default authSlice.reducer;
