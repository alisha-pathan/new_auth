import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserAPI, registerUserAPI } from '../auth/authApi'; // optional

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await loginUserAPI(userData);
            if (res?.data?.token) {
                localStorage.setItem("loginToken", res.data.token);
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
            } 
            return res;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

// Async thunk: Register
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await registerUserAPI(userData);
            return res;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Registration failed");
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("userInfo")) || null,
        token: localStorage.getItem("loginToken") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("loginToken");
            localStorage.removeItem("userInfo");
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.data.token;
                state.user = action.payload.data.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.token = action.payload.data.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


