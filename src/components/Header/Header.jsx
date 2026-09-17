import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk, selectIsAdmin } from '../../store/authSlice.js';
import styles from './Header.module.css';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const cartCount = useSelector((state) => state.cart.items.length);
    const isAdmin = useSelector(selectIsAdmin);

    function closeMenu() {
        setIsMenuOpen(false);
    }

    async function handleLogout() {
        closeMenu();
        await dispatch(logoutThunk());
        navigate('/login');
    }

    return (
        <header className={styles.header}>
            <Link to="/" onClick={closeMenu} className={styles.logo}>
                DC
            </Link>

            <nav className={isMenuOpen ? styles['nav-menu'] + ' ' + styles.open : styles['nav-menu']}>
                <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                <NavLink to="/products" onClick={closeMenu}>Productos</NavLink>
                {user ? (
                    <>
                        <NavLink to="/wishlist" onClick={closeMenu}>Favoritos</NavLink>
                        <NavLink to="/profile" onClick={closeMenu}>Perfil</NavLink>
                        {isAdmin && <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>}
                        <button type="button" onClick={handleLogout}>Salir</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" onClick={closeMenu}>Ingresar</NavLink>
                        <NavLink to="/register" onClick={closeMenu}>Registrarme</NavLink>
                    </>
                )}
            </nav>

            <div className={styles.headerActions}>
                {user && (
                    <NavLink to="/cart" onClick={closeMenu} className={styles.cartLink} aria-label={`Carrito, ${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`}>
                        <svg className={styles.cartIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="19" cy="21" r="1" />
                            <path d="M2.5 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" />
                        </svg>
                        <span className={styles.cartBadge}>{cartCount}</span>
                    </NavLink>
                )}
                <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}> ≡ </button>
            </div>
        </header>
    )
}
