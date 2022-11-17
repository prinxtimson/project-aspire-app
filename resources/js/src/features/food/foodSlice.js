import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "../auth/authSlice";
import foodService from "./foodService";

const initialState = {
    food: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getFood = createAsyncThunk("food/get", async (food, thunkAPI) => {
    try {
        return await foodService.getFood(food);
    } catch (err) {
        if (err.response.status === 401) {
            localStorage.removeItem("elintx-user");
            localStorage.removeItem("elintx-2fa");
            thunkAPI.dispatch(clearUser());
        }
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const foodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearFood: (state) => {
            state.food = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFood.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFood.fulfilled, (state, action) => {
                state.isLoading = false;
                state.food = action.payload;
            })
            .addCase(getFood.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearFood } = foodSlice.actions;
export default foodSlice.reducer;
