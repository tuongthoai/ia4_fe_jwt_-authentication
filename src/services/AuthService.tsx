// src/services/authService.ts
import api from "../api/api";
import {useAuthStore} from "../store/AuthStore.tsx";

export const register = async (userData: {
    username: string;
    password: string;
    name: string;
    lastname: string;
    address: string;
}) => {
    const response = await api.post("/register", userData);
    return response.data;
};

export const login = async (credentials: { username: string; password: string }) => {
    const response = await api.post("/login", credentials);
    const { access_token, refresh_token } = response.data;

    // Store tokens in Zustand
    const setTokens = useAuthStore.getState().setTokens;
    setTokens(access_token, refresh_token);

    return response.data;
};

export const fetchUserProfile = async () => {
    const response = await api.get(`/user/profile`);
    return response.data;
};
