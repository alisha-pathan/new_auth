import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserAPI, registerUserAPI } from '../auth/authApi';
import { setToken, getToken, setUser, getUser, clearAuthData, isTokenAboutToExpire, isTokenExpired } from '../utils/tokenServices';


// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await loginUserAPI(userData);
            if (!response?.data?.token) {
                throw new Error('No token received');
            }

            setToken(response.data.token);
            setUser(response.data.user);

            return {
                token: response.data.token,
                user: response.data.user
            };

        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await registerUserAPI(userData);
            return {
                token: response.data.token,
                user: response.data.user
            };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

// thunk for refresh token
export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await refreshTokenAPI();
            if (!response?.token) {
                throw new Error('No token received');
            }
            setToken(response.token);
            return response.token;
        } catch (err) {
            clearAuthData();
            return rejectWithValue('Session expired - please login again');
        }
    }
);

const initialState = {
    user: getUser(),
    token: getToken(),
    loading: false,
    error: null,
    isAuthenticated: !!getToken() && !isTokenExpired(getToken()), // Check expiration
    isRefreshing: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            clearAuthData();
            state.user = null;
            state.token = null;
            state.error = null;
            state.isAuthenticated = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshToken.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshToken.fulfilled, (state, { payload }) => {
                state.isRefreshing = false;
                state.token = payload;
                state.isAuthenticated = true;
            })
            .addCase(refreshToken.rejected, (state, { payload }) => {
                state.isRefreshing = false;
                state.isAuthenticated = false;
                state.error = payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.token = payload.token;
                state.user = payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload.token) {
                    state.token = payload.token;
                    state.user = payload.user;
                    state.isAuthenticated = true;
                    setToken(payload.token);
                    setUser(payload.user);
                }
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;


