import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Header } from "../Header/Header.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { checkSessionThunk } from '../../store/authSlice.js';
import { fetchWishlist } from '../../store/wishlistSlice.js';
import { fetchCart } from '../../store/cartSlice.js';
import styles from './Layout.module.css';

export function Layout() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(checkSessionThunk());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(fetchWishlist());
            dispatch(fetchCart());
        }
    }, [user, dispatch]);

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
