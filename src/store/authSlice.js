import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, logout as logoutRequest } from '../api/auth.js';
import { getProfile } from '../api/users.js';

const initialState = {
    user: null,
    loading: false,
    error: null,
    sessionChecked: false,
};

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        const data = await login(credentials);
        return data;
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (credentials) => {
        const data = await register(credentials);
        return data;
    }
);

export const checkSessionThunk = createAsyncThunk('auth/checkSession', async () => {
    const user = await getProfile();
    return user;
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
    await logoutRequest();
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.sessionChecked = true;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(checkSessionThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.sessionChecked = true;
            })
            .addCase(checkSessionThunk.rejected, (state) => {
                state.user = null;
                state.sessionChecked = true;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const selectIsAdmin = (state) => state.auth.user?.role === 'ADMIN';

export default authSlice.reducer;
