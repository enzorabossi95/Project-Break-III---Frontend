import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlist, toggleWishlist } from '../api/wishlist.js';

const initialState = {
    productIds: [],
    loading: false,
    error: null,
};

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async () => {
    const wishlist = await getWishlist();
    return wishlist;
});

export const toggleWishlistThunk = createAsyncThunk(
    'wishlist/toggleWishlist',
    async (productId) => {
        const wishlist = await toggleWishlist(productId);
        return wishlist;
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.productIds = action.payload.productIds;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(toggleWishlistThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(toggleWishlistThunk.fulfilled, (state, action) => {
                state.productIds = action.payload.productIds;
            })
            .addCase(toggleWishlistThunk.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default wishlistSlice.reducer;
