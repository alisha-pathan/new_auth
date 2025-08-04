import axios from "axios";

const API = axios.create({
    baseURL: "https://examination-backend-wn5h.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const loginUserAPI = async (userData) => {
    const response = await API.post("/auth/login", userData);
    console.log(response.data);
    
    return response.data;
};

 
export const registerUserAPI = async (userData) => {
    const response = await API.post("/auth/signup", userData);
    return response.data;
};


