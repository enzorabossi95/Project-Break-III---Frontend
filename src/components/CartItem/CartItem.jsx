import { useProduct } from '../../hooks/useProduct.js';
import { Button } from '../Button/Button.jsx';

export function CartItem({ item, onRemove }) {
    const { data: product, loading, error } = useProduct(item.productId);

    if (loading) return <div>Cargando producto...</div>;
    if (error || !product) return <div>Producto no disponible</div>;

    return (
        <div>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <span>${product.price.toFixed(2)} x {item.quantity}</span>
            <span>Subtotal: ${(product.price * item.quantity).toFixed(2)}</span>
            <Button variant="danger" type="button" onClick={() => onRemove(item.id)}>
                Eliminar
            </Button>
        </div>
    );
}
