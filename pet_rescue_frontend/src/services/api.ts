import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (credentials: any) => {
        const response = await api.post('v1/users/login/', credentials);
        if (response.data.data.access) {
            localStorage.setItem('access_token', response.data.data.access);
            localStorage.setItem('refresh_token', response.data.data.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;
    },
    register: async (userData: any) => {
        const response = await api.post('v1/users/register/', userData);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
};

export const petService = {
    getAll: async () => {
        const response = await api.get('v1/pets/get/');
        return response.data;
    },
    getById: async (id: number | string) => {
        const response = await api.get(`v1/pets/${id}/pet-detail/`);
        return response.data;
    },
    register: async (petData: any) => {
        const response = await api.post('v1/pets/register-pet/', petData);
        return response.data;
    },
    update: async (id: number | string, petData: any) => {
        const response = await api.patch(`v1/pets/${id}/update-pet/`, petData);
        return response.data;
    },
    delete: async (id: number | string) => {
        const response = await api.delete(`v1/pets/${id}/delete-pet/`);
        return response.data;
    },
};

export const reportService = {
    getAll: async () => {
        const response = await api.get('v1/pet-reports/');
        return response.data;
    },
    create: async (reportData: any) => {
        const response = await api.post('v1/pet-reports/', reportData);
        return response.data;
    },
};

export const adminService = {
    getStats: async () => {
        const response = await api.get('v1/users/admin-dashboard/');
        return response.data;
    },
    getReports: async () => {
        const response = await api.get('v1/users/admin-pet-reports/');
        return response.data;
    },
    getUsers: async () => {
        const response = await api.get('v1/users/admin-users/');
        return response.data;
    },
};

export default api;
