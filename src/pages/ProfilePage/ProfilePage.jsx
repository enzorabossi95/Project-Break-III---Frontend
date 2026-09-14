import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice.js';
import { Button } from '../../components/Button/Button.jsx';

export function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    function handleLogout() {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div>
            <h1>Mi perfil</h1>
            {user ? (
                <div>
                    <p>Email: {user.email}</p>
                    <p>Rol: {user.role}</p>
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}
            <Button variant="secondary" type="button" onClick={handleLogout}>
                Cerrar sesión
            </Button>
        </div>
    );
}
