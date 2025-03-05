import { create } from 'zustand';

interface User {
  id: number;
  // Kullanıcı tipinize göre diğer alanları ekleyin
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  user: User | null;
  
  // Getters
  isAuthenticated: () => boolean;
  getUser: () => User | null;
  getToken: () => string | null;
  
  // Actions
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  
  // Getters
  isAuthenticated: () => !!get().token,
  getUser: () => get().user,
  getToken: () => get().token,
  
  // Actions
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  }
}));

export default useAuthStore;