import axios, { AxiosError } from 'axios';
import { useUserStore } from '@/store/useUserStore';

const API_URL = 'http://localhost:5000/api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface User {
    id: number;
    email: string;
    username: string;
}

interface AuthResponse {
    token: string;
    user: User;
}

export default class AuthService {
    private api;
    

    constructor() {
        const token = localStorage.getItem('token');
        this.api = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            }
        });

        // Interceptor ekle
        this.api.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                // Login ve register endpointleri için 401 kontrolü yapma
                const isAuthEndpoint = error.config?.url?.includes('/login') || error.config?.url?.includes('/register');
                
                if (error.response?.status === 401 && !isAuthEndpoint) {
                    localStorage.removeItem('token');
                    useUserStore.getState().clearUser();
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const { data } = await this.api.post('/users/login', credentials);
            if (data.token) {
                localStorage.setItem('token', data.token);
                useUserStore.getState().setUser(data.user);
            }
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Giriş yapılırken bir hata oluştu');
        }
    }

    async register(userData: LoginCredentials & { username: string }): Promise<AuthResponse> {
        try {
            const { data } = await this.api.post('/users/register', userData);
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Kayıt olurken bir hata oluştu');
        }
    }

    async logout(): Promise<void> {
        localStorage.removeItem('token');
        useUserStore.getState().clearUser();
        window.location.href = '/login';
    }

    async getUser(): Promise<User> {
        try {
            const { data } = await this.api.get<User>('/users/profile');
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Kullanıcı bilgileri alınırken bir hata oluştu');
        }
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}