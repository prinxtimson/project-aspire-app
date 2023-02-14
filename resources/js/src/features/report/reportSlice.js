import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "./reportService";

const initialState = {
    reports: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getReports = createAsyncThunk(
    "report/get-reports",
    async (thunkAPI) => {
        try {
            return await reportService.getReports();
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

export const generateReport = createAsyncThunk(
    "report/generate-report",
    async (data, thunkAPI) => {
        try {
            return await reportService.generateReport(data);
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

export const archivedReport = createAsyncThunk(
    "report/archived-report",
    async (id, thunkAPI) => {
        try {
            return await reportService.archivedReport(id);
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

export const trashedReport = createAsyncThunk(
    "report/trashed-report",
    async (id, thunkAPI) => {
        try {
            return await reportService.trashedReport(id);
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

export const restoredReport = createAsyncThunk(
    "report/restored-report",
    async (id, thunkAPI) => {
        try {
            return await reportService.restoredReport(id);
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

export const deleteReport = createAsyncThunk(
    "report/delete-report",
    async (id, thunkAPI) => {
        try {
            return await reportService.deleteReport(id);
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

export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearReport: (state) => {
            state.reports = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReports.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = action.payload;
            })
            .addCase(getReports.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(generateReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(generateReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = [action.payload, ...state.reports];
            })
            .addCase(generateReport.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(archivedReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(archivedReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(archivedReport.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(trashedReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(trashedReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(trashedReport.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(restoredReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(restoredReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(restoredReport.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(deleteReport.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearReport } = reportSlice.actions;
export default reportSlice.reducer;
