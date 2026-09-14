import { api } from './axios';

export async function getReviews(productId) {
    const response = await api.get(`/api/products/${productId}/reviews`);
    return response.data.data;
}

export async function addReview(productId, data) {
    const response = await api.post(`/api/products/${productId}/reviews`, data);
    return response.data.data;
}