import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectIsAdmin } from '../../store/authSlice.js';

export function AdminRoute() {
    const { user, sessionChecked } = useSelector((state) => state.auth);
    const isAdmin = useSelector(selectIsAdmin);
    const location = useLocation();

    if (!sessionChecked) {
        return <div>Cargando...</div>;
    }

    if (!user || !isAdmin) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
