import {create} from "zustand";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearTokens: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,
    username: null,

    setTokens: (accessToken, refreshToken) =>
        set({accessToken, refreshToken}),

    clearTokens: () =>
        set({accessToken: null, refreshToken: null}),
}));
