import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "../auth/authSlice";
import sportService from "./sportService";

const initialState = {
    tennis: null,
    football: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getTennis = createAsyncThunk(
    "sport/get-tennis",
    async (thunkAPI) => {
        try {
            return await sportService.getTennis();
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

export const getFootballById = createAsyncThunk(
    "sport/get-football",
    async (id, thunkAPI) => {
        try {
            return await sportService.getFootballById(id);
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

export const sportSlice = createSlice({
    name: "sport",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearSport: (state) => {
            state.tennis = null;
            state.football = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTennis.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTennis.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tennis = action.payload;
            })
            .addCase(getTennis.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getFootballById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFootballById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.football = action.payload;
            })
            .addCase(getFootballById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearSport } = sportSlice.actions;
export default sportSlice.reducer;
