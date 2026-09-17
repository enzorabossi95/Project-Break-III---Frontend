import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function PrivateRoute() {
    const { user, sessionChecked } = useSelector((state) => state.auth);

    if (!sessionChecked) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
