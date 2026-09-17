import { Link } from 'react-router-dom';
import styles from './AdminPage.module.css';

export function AdminPage() {
    return (
        <div>
            <h1 className={styles.title}>Panel de administración</h1>
            <p className={styles.text}>Bienvenido al panel de administración</p>
            <Link className="btn primary" to="/admin/products">Gestionar productos</Link>
        </div>
    );
}
