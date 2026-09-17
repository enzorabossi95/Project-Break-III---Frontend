import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../store/authSlice.js';
import { Button } from '../../components/Button/Button.jsx';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    async function handleLogout() {
        await dispatch(logoutThunk());
        navigate('/login');
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Mi perfil</h1>
                {user ? (
                    <div className={styles.info}>
                        <div className={styles.row}>
                            <span className={styles.label}>Email</span>
                            <span>{user.email}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Rol</span>
                            <span>{user.role}</span>
                        </div>
                    </div>
                ) : (
                    <p className={styles.info}>Cargando perfil...</p>
                )}
                <Button variant="secondary" type="button" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </div>
        </div>
    );
}
