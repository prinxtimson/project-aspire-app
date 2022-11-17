import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "../auth/authSlice";
import entertainmentService from "./entertainmentService";

const initialState = {
    video: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getVideo = createAsyncThunk(
    "entertainment/video",
    async (thunkAPI) => {
        try {
            return await entertainmentService.getVideo();
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

export const entertainmentSlice = createSlice({
    name: "entertainment",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearEntertainment: (state) => {
            state.video = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.video = action.payload;
            })
            .addCase(getVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearEntertainment } = entertainmentSlice.actions;
export default entertainmentSlice.reducer;
