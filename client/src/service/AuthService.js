import axiosInstance from '@/plugins/axios';
import { useAuthStore } from '@/stores/auth';

export default class AuthService {
    constructor() {
        // Request interceptor
        axiosInstance.interceptors.request.use(
            (config) => {
                const authStore = useAuthStore();
                const token = authStore.getToken;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    const authStore = useAuthStore();
                    authStore.logout();
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    async login(credentials) {
        try {
            const response = await axiosInstance.post('/users/login', credentials);
            return response.data;
        } catch (error) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Giriş yapılırken bir hata oluştu');
        }
    }

    async register(userData) {
        try {
            const response = await axiosInstance.post('/users/register', userData);
            return response.data;
        } catch (error) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Kayıt olurken bir hata oluştu');
        }
    }

    async logout() {
        try {
            const authStore = useAuthStore();
            const response = await axiosInstance.post('/users/logout');
            authStore.logout();
            return response.data;
        } catch (error) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Çıkış yapılırken bir hata oluştu');
        }
    }
}


