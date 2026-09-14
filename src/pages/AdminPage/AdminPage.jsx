import { Link } from 'react-router-dom';

export function AdminPage() {
    return (
        <div>
            <h1>Panel de administración</h1>
            <p>Bienvenido al panel de administración</p>
            <Link to="/admin/products">Gestionar productos</Link>
        </div>
    );
}
