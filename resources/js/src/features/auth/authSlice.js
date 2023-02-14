import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage
const user = localStorage.getItem("elintx-user");
const tfa = localStorage.getItem("elintx-2fa");
const token = localStorage.getItem("elintx-access-token");

const initialState = {
    user: user === "undefined" ? null : JSON.parse(user),
    tfa: tfa == "undefined" ? null : tfa,
    token: token == "undefined" ? null : token,
    notifications: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register user
export const register = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            return await authService.register(data);
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

export const registerAdmin = createAsyncThunk(
    "auth/admin-register",
    async (data, thunkAPI) => {
        try {
            return await authService.registerAdmin(data);
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

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        return await authService.login(data);
    } catch (err) {
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const updateUser = createAsyncThunk(
    "auth/update",
    async (data, thunkAPI) => {
        try {
            return await authService.updateUser(data);
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

export const forgotPass = createAsyncThunk(
    "auth/forgot-password",
    async (email, thunkAPI) => {
        try {
            return await authService.forgotPass(email);
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

export const resetPass = createAsyncThunk(
    "auth/reset-password",
    async (data, thunkAPI) => {
        try {
            const res = await authService.resetPass(data);

            return res;
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

export const changePass = createAsyncThunk(
    "auth/change-password",
    async (data, thunkAPI) => {
        try {
            return await authService.changePass(data);
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

export const verifyCode = createAsyncThunk(
    "auth/verify-code",
    async (data, thunkAPI) => {
        try {
            return await authService.verifyCode(data);
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

export const updateSetting = createAsyncThunk(
    "auth/update-settings",
    async (data, thunkAPI) => {
        try {
            return await authService.updateSetting(data);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            if (err.response.status === 401 || err.response.status === 403) {
                localStorage.removeItem("elintx-user");
                localStorage.removeItem("elintx-access-token");
                localStorage.removeItem("elintx-2fa");
                thunkAPI.dispatch(clearUser());
            }

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const resendCode = createAsyncThunk(
    "auth/resend-code",
    async (thunkAPI) => {
        try {
            return await authService.resendCode();
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

export const getCurrentUser = createAsyncThunk("auth/me", async (thunkAPI) => {
    try {
        return await authService.getCurrentUser();
    } catch (err) {
        if (err.response.status === 401 || err.response.status === 403) {
            localStorage.removeItem("elintx-user");
            localStorage.removeItem("elintx-access-token");
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

export const markNotification = createAsyncThunk(
    "auth/mark-notification",
    async (thunkAPI) => {
        try {
            return await authService.markNotification();
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

export const deleteAccount = createAsyncThunk(
    "auth/delete-account",
    async (thunkAPI) => {
        try {
            return await authService.deleteAccount();
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

export const deleteUser = createAsyncThunk(
    "auth/delete-user",
    async (id, thunkAPI) => {
        try {
            return await authService.deleteUser(id);
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

export const deactivateUser = createAsyncThunk(
    "auth/deactivate-user",
    async (id, thunkAPI) => {
        try {
            return await authService.deactivateUser(id);
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

export const activateUser = createAsyncThunk(
    "auth/activate-user",
    async (id, thunkAPI) => {
        try {
            return await authService.activateUser(id);
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

export const resendVerification = createAsyncThunk(
    "auth/resend-verification",
    async (thunkAPI) => {
        try {
            return await authService.resendVerification();
        } catch (err) {
            if (err.response.status === 401) {
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

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearUser: (state) => {
            state.user = null;
            state.tfa = null;
            state.notifications = null;
        },
        newNotification: (state, action) => {
            if (
                state.notifications.data.filter(
                    (val) => val.id === action.payload.id
                ).length === 0
            ) {
                let data = [action.payload, ...state.notifications.data];
                let count = state.notifications.count + 1;
                state.notifications = { data, count };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.token = null;
                state.message = action.payload;
            })
            .addCase(registerAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(registerAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.token = null;
                state.message = action.payload;
            })
            .addCase(activateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(activateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(activateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deactivateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deactivateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(deactivateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Profile update successful";
                state.user = action.payload.user;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateSetting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSetting.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.user = action.payload.user;
            })
            .addCase(updateSetting.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(verifyCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tfa = true;
                state.message = "Successful";
            })
            .addCase(verifyCode.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resendCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resendCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "New OTP code had been sent to your email";
            })
            .addCase(resendCode.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.user = null;
                state.tfa = null;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.token = null;
            })
            .addCase(markNotification.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
                state.user = null;
                state.token = null;
                state.tfa = null;
            })
            .addCase(changePass.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(changePass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(forgotPass.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(forgotPass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resendVerification.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resendVerification.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(resendVerification.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resetPass.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(resetPass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearUser, newNotification } = authSlice.actions;
export default authSlice.reducer;
