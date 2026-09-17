import { api } from './axios';

export async function createCheckoutSession() {
    const response = await api.post('/api/checkout/session');
    return response.data.data;
}

export async function confirmCheckoutSession(sessionId) {
    const response = await api.post('/api/checkout/confirm', { sessionId });
    return response.data.data;
}
