import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
    return (
        <div className={styles.page}>
            <h1 className={styles.code}>404</h1>
            <p className={styles.text}>Página no encontrada</p>
            <Link className={styles.link} to="/">Volver al inicio</Link>
        </div>
    )
}
