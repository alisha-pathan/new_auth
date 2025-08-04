import axios from "axios";

export const api = axios.create({
    baseURL: "https://examination-backend-wn5h.onrender.com",
    headers: {
        "Content-Type": "application/json",
        // Add other default headers here
    },
});



// export const fetchApi = async (method, endpoint, data = null) => {
//     try {
//         const response = await api.request({
//             method,
//             url: endpoint,
//             data, // for POST/PUT, ignored for GET/DELETE
//         });

//         return response.data;
//     } catch (error) {
//         console.error(error, "<=== API Error");
//         throw error;
//     }
// };
