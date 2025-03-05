import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api';

interface Todo {
  description: string;
  priority: string;
  status: string;
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default class TodoService {
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
        if (error.response?.status === 401) {
          // Token'ı sil
          localStorage.removeItem('token');
          // Kullanıcıyı login sayfasına yönlendir
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async getAllTodos(): Promise<Todo[]> {
    try {
      const { data } = await this.api.get('/todos/getAllTodos');
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Todo listesi alınırken bir hata oluştu');
    }
  }

  async createTodo(title: string, description: string, priority: string, status: string): Promise<Todo> {
    try {
      const { data } = await this.api.post('/todos/createTodo', { title, description, priority, status });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Todo oluşturulurken bir hata oluştu');
    }
  }

  async getTodoById(id: number): Promise<Todo> {
    try {
      const { data } = await this.api.get(`/todos/${id}`);
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Todo bulunurken bir hata oluştu');
    }
  }

  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
    try {
      const { data } = await this.api.put(`/todos/${id}`, updates);
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Todo güncellenirken bir hata oluştu');
    }
  }

  async deleteTodo(id: number): Promise<void> {
    try {
      await this.api.delete(`/todos/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Todo silinirken bir hata oluştu');
    }
  }

  async changeStatus(id: number, status: string): Promise<void> {
    try {
      await this.api.post(`/todos/changeStatus/${id}`, { status });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Todo durumu güncellenirken bir hata oluştu');
    }
  }
}