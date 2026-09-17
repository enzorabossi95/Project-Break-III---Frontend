import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts.js';
import { deleteProduct } from '../../api/products.js';
import { Button } from '../../components/Button/Button.jsx';
import styles from './AdminProductsPage.module.css';

export function AdminProductsPage() {
    const { data: products, loading, error, refetch } = useProducts();
    const [deletingId, setDeletingId] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    async function handleDelete(id) {
        if (!window.confirm('¿Seguro que querés eliminar este producto?')) return;
        setDeletingId(id);
        setDeleteError(null);
        try {
            await deleteProduct(id);
            await refetch();
        } catch {
            setDeleteError('No se pudo eliminar el producto');
        } finally {
            setDeletingId(null);
        }
    }

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error al cargar productos</div>;

    return (
        <div>
            <div className={styles.topBar}>
                <h1 className={styles.title}>Productos</h1>
                <Link className="btn primary" to="/admin/products/new">Crear producto</Link>
            </div>
            {deleteError && <p className={styles.error}>{deleteError}</p>}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td>
                                <div className={styles.actions}>
                                    <Link className={styles.editLink} to={`/admin/products/${product.id}/edit`}>Editar</Link>
                                    <Button
                                        variant="danger"
                                        type="button"
                                        onClick={() => handleDelete(product.id)}
                                        disabled={deletingId === product.id}
                                    >
                                        {deletingId === product.id ? 'Eliminando...' : 'Eliminar'}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
