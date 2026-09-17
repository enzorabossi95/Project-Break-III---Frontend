import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isPassiveSessionCheck = error.config?.url?.includes('/api/users/profile');

        if (error.response?.status === 401 && !isPassiveSessionCheck && window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);