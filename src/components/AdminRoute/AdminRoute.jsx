import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectIsAdmin } from '../../store/authSlice.js';

export function AdminRoute() {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const isAdmin = useSelector(selectIsAdmin);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    // El token ya está, pero el perfil (y su role) todavía no terminó de cargar
    // (fetchProfileThunk se dispara en Layout y es async) — esperar antes de decidir,
    // para no expulsar a un admin real por una carrera entre esta ruta y ese fetch.
    if (!user) {
        return <div>Cargando...</div>;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
