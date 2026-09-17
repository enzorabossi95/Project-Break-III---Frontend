import { api } from './axios'

export async function login(data) {
    const response = await api.post('/api/auth/login', data)
    return response.data.data
}

export async function register(data) {
    const response = await api.post('/api/auth/register', data)
    return response.data.data
}

export async function logout() {
    await api.post('/api/auth/logout')
}