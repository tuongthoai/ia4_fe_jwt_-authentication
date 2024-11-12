// src/api/api.ts
import axios from "axios";
import {useAuthStore} from "../store/AuthStore.tsx";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add the access token to every request
api.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token refreshing on 401 errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // const originalRequest = error.config;
        // const refreshToken = useAuthStore.getState().refreshToken;

        // console.log(error, originalRequest);
        // if (error.response.status === 401 && refreshToken && !originalRequest._retry) {
        //     originalRequest._retry = true;
        //     try {
        //         const {data} = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/refresh-token`, {
        //             refresh_token: refreshToken,
        //         });
        //
        //         // Update tokens in Zustand
        //         useAuthStore.getState().setTokens(data.access_token, data.refresh_token);
        //
        //         // Retry the original request with the new access token
        //         originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        //         return api(originalRequest);
        //     } catch (err) {
        //         // Clear tokens and redirect to login if refresh fails
        //         useAuthStore.getState().clearTokens();
        //         window.location.href = "/login";
        //         console.log(err)
        //     }
        // }
        return Promise.reject(error);
    }
);

export default api;
