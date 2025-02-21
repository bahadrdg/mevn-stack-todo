import axiosInstance from '@/plugins/axios';

export default class TodoService {
    constructor() {
        // Request interceptor
        axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
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
                    authStore.logout(); // Kullanıcıyı çıkış yap
                    window.location.href = '/login'; // Giriş sayfasına yönlendir
                }
                return Promise.reject(error);
            }
        );
    }

    async getAllTodos() {
        const response = await axiosInstance.get('/todos/getAllTodos');
        return response.data;
    }

    async createTodo(todo) {
        const response = await axiosInstance.post('/todos/createTodo', todo);
        return response.data;
    }

    async getTodoById(id) {
        const response = await axiosInstance.get(`/todos/${id}`);
        return response.data;
    }

    async updateTodo(id, todo) {
        const response = await axiosInstance.put(`/todos/${id}`, todo);
        return response.data;
    }

    async deleteTodo(id) {
        const response = await axiosInstance.delete(`/todos/${id}`);
        return response.data;
    }
}
