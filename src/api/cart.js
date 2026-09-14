import { api } from './axios';

export async function getCart() {
    const response = await api.get('/api/cart');
    return response.data.data;
}

export async function addToCart(productId, quantity) {
    const response = await api.post('/api/cart/items', { productId, quantity });
    return response.data.data;
}

export async function removeFromCart(itemId) {
    const response = await api.delete(`/api/cart/items/${itemId}`);
    return response.data.data;
}

export async function checkout() {
    const response = await api.post('/api/cart/checkout');
    return response.data.data;
}
