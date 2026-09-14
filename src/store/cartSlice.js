import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, addToCart, removeFromCart, checkout } from '../api/cart.js';

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

export const checkoutThunk = createAsyncThunk('cart/checkout', async () => {
    const order = await checkout();
    return order;
});

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
            .addCase(checkoutThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkoutThunk.fulfilled, (state) => {
                state.loading = false;
                state.items = [];
            })
            .addCase(checkoutThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default cartSlice.reducer;
