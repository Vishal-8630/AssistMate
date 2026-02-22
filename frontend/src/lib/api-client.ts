import axios, { AxiosError } from 'axios';
import { clearAccessToken, getAccessToken, setAccessToken } from './token-manager';
import { RefreshTokenResponse } from '@/types/auth';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest: any = error.config;

        if (originalRequest?.url?.includes("/auth/refresh-token")) {
            clearAccessToken();
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await api.post<RefreshTokenResponse>("/auth/refresh-token");

                setAccessToken(data.accessToken);

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                clearAccessToken();
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api;