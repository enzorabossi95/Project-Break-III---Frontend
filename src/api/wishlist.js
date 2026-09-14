import { api } from './axios';

export async function getWishlist() {
    const response = await api.get('/api/wishlist');
    return response.data.data;
}

export async function toggleWishlist(productId) {
    const response = await api.post(`/api/wishlist/${productId}`);
    return response.data.data;
}
