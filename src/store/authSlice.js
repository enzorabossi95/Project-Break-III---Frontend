import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api/auth.js';
import { getProfile } from '../api/users.js';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: null,
    loading: false,
    error: null,
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

export const fetchProfileThunk = createAsyncThunk('auth/fetchProfile', async () => {
    const user = await getProfile();
    return user;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token);
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
            .addCase(fetchProfileThunk.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchProfileThunk.rejected, (state) => {
                // token inválido/expirado: el interceptor 401 ya limpia localStorage y redirige
                state.token = null;
                state.user = null;
            });
    },
});

export const selectIsAdmin = (state) => state.auth.user?.role === 'ADMIN';

export const { logout } = authSlice.actions;
export default authSlice.reducer;