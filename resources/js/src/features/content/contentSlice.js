import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contentService from "./contentService";

const initialState = {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getPrivacy = createAsyncThunk(
    "content/get-privacy",
    async (thunkAPI) => {
        try {
            return await contentService.getPrivacy();
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

export const getTnC = createAsyncThunk(
    "content/get-terms-and-conditions",
    async (thunkAPI) => {
        try {
            return await contentService.getTnC();
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

export const updateContent = createAsyncThunk(
    "content/update",
    async (data, thunkAPI) => {
        try {
            return await contentService.updateContent(data);
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

export const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearContent: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPrivacy.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPrivacy.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getPrivacy.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTnC.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTnC.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getTnC.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateContent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateContent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.isSuccess = true;
                state.message = "Content update successful";
            })
            .addCase(updateContent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearContent } = contentSlice.actions;
export default contentSlice.reducer;
