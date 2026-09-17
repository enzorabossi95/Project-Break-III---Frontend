import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, addToCart, removeFromCart } from '../api/cart.js';
import { createCheckoutSession, confirmCheckoutSession } from '../api/checkout.js';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const cart = await getCart();
    return cart;
});

export const addCartItem = createAsyncThunk(
    'cart/addCartItem',
    async ({ productId, quantity }) => {
        const item = await addToCart(productId, quantity);
        return item;
    }
);

export const removeCartItem = createAsyncThunk(
    'cart/removeCartItem',
    async (itemId) => {
        await removeFromCart(itemId);
        return itemId;
    }
);

export const createStripeSessionThunk = createAsyncThunk('cart/createStripeSession', async () => {
    const { url } = await createCheckoutSession();
    return url;
});

export const confirmStripeCheckoutThunk = createAsyncThunk(
    'cart/confirmStripeCheckout',
    async (sessionId) => {
        const order = await confirmCheckoutSession(sessionId);
        return order;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.loading = false;
                const newItem = action.payload;
                const index = state.items.findIndex(
                    (item) => item.productId === newItem.productId
                );
                if (index !== -1) {
                    state.items[index] = newItem;
                } else {
                    state.items.push(newItem);
                }
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createStripeSessionThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStripeSessionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(confirmStripeCheckoutThunk.fulfilled, (state) => {
                state.items = [];
            })
            .addCase(confirmStripeCheckoutThunk.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default cartSlice.reducer;
