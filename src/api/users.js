import { api } from './axios';

export async function getProfile() {
    const response = await api.get('/api/users/profile');
    return response.data.data;
}
