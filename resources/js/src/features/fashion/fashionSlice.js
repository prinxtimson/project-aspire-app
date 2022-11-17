import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "../auth/authSlice";
import fashionService from "./fashionService";

const initialState = {
    gender: null,
    category: null,
    season: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getGender = createAsyncThunk(
    "fashion/get-gender",
    async (thunkAPI) => {
        try {
            return await fashionService.getGender();
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

export const getCategory = createAsyncThunk(
    "fashion/get-category",
    async (id, thunkAPI) => {
        try {
            return await fashionService.getCategory();
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

export const getSeason = createAsyncThunk(
    "fashion/get-season",
    async (thunkAPI) => {
        try {
            return await fashionService.getSeason();
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

export const fashionSlice = createSlice({
    name: "fashion",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearFashion: (state) => {
            data.gender = null;
            data.category = null;
            data.season = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGender.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGender.fulfilled, (state, action) => {
                state.isLoading = false;
                state.gender = action.payload;
            })
            .addCase(getGender.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.category = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getSeason.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSeason.fulfilled, (state, action) => {
                state.isLoading = false;
                state.season = action.payload;
            })
            .addCase(getSeason.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearFashion } = fashionSlice.actions;
export default fashionSlice.reducer;
