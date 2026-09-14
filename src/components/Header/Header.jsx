import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAdmin } from '../../store/authSlice.js';
import styles from './Header.module.css';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const cartCount = useSelector((state) => state.cart.items.length);
    const isAdmin = useSelector(selectIsAdmin);

    function closeMenu() {
        setIsMenuOpen(false);
    }

    function handleLogout() {
        closeMenu();
        dispatch(logout());
        navigate('/login');
    }

    return (
        <header className={styles.header}>
            <div>
                DC
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}> ≡ </button>

            <nav className={isMenuOpen ? styles['nav-menu'] + ' ' + styles.open : styles['nav-menu']}>
                <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                <NavLink to="/products" onClick={closeMenu}>Productos</NavLink>
                {token ? (
                    <>
                        <NavLink to="/cart" onClick={closeMenu}>
                            Carrito{cartCount > 0 ? ` (${cartCount})` : ''}
                        </NavLink>
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
        </header>
    )
}
