import { useProduct } from '../../hooks/useProduct.js';
import { Button } from '../Button/Button.jsx';
import styles from './CartItem.module.css';

export function CartItem({ item, onRemove }) {
    const { data: product, loading, error } = useProduct(item.productId);

    if (loading) return <div>Cargando producto...</div>;
    if (error || !product) return <div>Producto no disponible</div>;

    return (
        <div className={styles.item}>
            <img className={styles.image} src={product.imageUrl} alt={product.name} />
            <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <span className={styles.priceLine}>${product.price.toFixed(2)} x {item.quantity}</span>
            </div>
            <span className={styles.subtotal}>${(product.price * item.quantity).toFixed(2)}</span>
            <Button variant="danger" type="button" onClick={() => onRemove(item.id)}>
                Eliminar
            </Button>
        </div>
    );
}
