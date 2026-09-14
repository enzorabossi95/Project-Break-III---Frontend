import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Header } from "../Header/Header.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { fetchProfileThunk } from '../../store/authSlice.js';
import { fetchWishlist } from '../../store/wishlistSlice.js';
import { fetchCart } from '../../store/cartSlice.js';
import styles from './Layout.module.css';

export function Layout() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(fetchProfileThunk());
            dispatch(fetchWishlist());
            dispatch(fetchCart());
        }
    }, [token, dispatch]);

    return (
        <>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
