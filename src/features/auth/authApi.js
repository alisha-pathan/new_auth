import axios from "axios";
import { setToken, getToken, clearAuthData } from '../utils/tokenServices';

const API = axios.create({
    baseURL: "https://examination-backend-wn5h.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor - optimized
API.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

// Response interceptor - optimized
let refreshTokenPromise = null;

API.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        // Only handle 401 errors and avoid retry loops
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }
        
        originalRequest._retry = true;
        
        try {
            // Use a single refresh token promise to prevent multiple refreshes
            refreshTokenPromise = refreshTokenPromise || refreshTokenAPI();
            const { token } = await refreshTokenPromise;
            
            // Reset the promise after successful refresh
            refreshTokenPromise = null;
            
            // Update token and retry request
            setToken(token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
        } catch (refreshError) {
            // Clear auth data if refresh fails
            clearAuthData();
            return Promise.reject(refreshError);
        }
    }
);

// API methods with consistent error handling
const handleRequest = async (request) => {
    try {
        const response = await request();
        return response.data;
    } catch (error) {
        const errorData = error.response?.data || { message: error.message };
        throw {
            message: errorData.message || "Request failed",
            status: error.response?.status,
            data: errorData
        };
    }
};

export const loginUserAPI = (userData) => 
    handleRequest(() => API.post("/auth/login", userData));

export const registerUserAPI = (userData) => 
    handleRequest(() => API.post("/auth/signup", userData));

export const refreshTokenAPI = () => 
    handleRequest(() => API.post("/auth/refresh", { token: getToken() }));