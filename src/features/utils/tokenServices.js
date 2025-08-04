// src/utils/tokenServices.js
const TOKEN_KEY = 'loginToken';
const USER_KEY = 'userInfo';


// decode token 

export const decodeToken = (token) => { 
    try {
        if (!token) return null;
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const isTokenExpired = (token) => { 
    const decoded = decodeToken(token);
    if (!decoded?.exp) return true;
    return Date.now() >= decoded.exp * 1000;
};

export const isTokenAboutToExpire = (token, thresholdMinutes = 5) => {
    const decoded = decodeToken(token);
    if (!decoded?.exp) return true;
    const thresholdMs = thresholdMinutes * 60 * 1000;
    return Date.now() >= (decoded.exp * 1000 - thresholdMs);
};



// Token operations
export const setToken = (token) => {
    try {
        localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

export const getToken = () => {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

// User data operations
export const setUser = (user) => {
    try {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Error saving user:', error);
    }
};

export const getUser = () => {
    try {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

// Combined operations
export const clearAuthData = () => {
    try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Error clearing auth data:', error);
    }
};

