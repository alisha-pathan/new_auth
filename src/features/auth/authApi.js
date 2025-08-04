import axios from "axios";
import {
    setToken,
    getToken,
    setUser,
    getUser,
    clearAuthData,
    isTokenExpired,       // Add this
    isTokenAboutToExpire  // Add this if using in your slice
} from '../utils/tokenServices'
const API = axios.create({
    baseURL: "https://examination-backend-wn5h.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('loginToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

API.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return API(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { token } = await refreshTokenAPI();
                API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                processQueue(null, token);
                return API(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// API methods
export const loginUserAPI = async (userData) => {
    try {
        const response = await API.post("/auth/login", userData);
        return response.data;
    } catch (error) {
        throw {
            message: error.response?.data?.message || "Login failed",
            status: error.response?.status,
        };
    }
};

export const registerUserAPI = async (userData) => {
    try {
        const response = await API.post("/auth/signup", userData);
        return response.data;
    } catch (error) {
        throw {
            message: error.response?.data?.message || "Registration failed",
            status: error.response?.status,
        };
    }
};

export const refreshTokenAPI = async () => {
    try {
        const response = await API.post("/auth/refresh", {
            token: localStorage.getItem('loginToken')
        });
        return response.data;
    } catch (error) {
        throw {
            message: error.response?.data?.message || "Token refresh failed",
            status: error.response?.status,
        };
    }
};