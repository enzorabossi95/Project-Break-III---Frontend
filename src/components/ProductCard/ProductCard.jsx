import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../store/cartSlice.js';
import { WishlistButton } from '../WishlistButton/WishlistButton.jsx';
import { Button } from '../Button/Button.jsx';
import styles from './ProductCard.module.css';

export function ProductCard({ product }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState('idle');
    const [cartError, setCartError] = useState(null);

    async function handleAddToCart() {
        setStatus('loading');
        setCartError(null);
        try {
            await dispatch(addCartItem({ productId: product.id, quantity: 1 })).unwrap();
            setStatus('added');
            setTimeout(() => setStatus('idle'), 1500);
        } catch {
            setStatus('idle');
            setCartError('No se pudo agregar al carrito. Verificá el stock disponible.');
        }
    }

    return (
        <div className={styles.card}>
            <Link to={`/products/${product.id}`}>
                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={product.imageUrl} alt={product.name} />
                </div>
            </Link>
            <div className={styles.body}>
                <Link to={`/products/${product.id}`}>
                    <h2 className={styles.name}>{product.name}</h2>
                </Link>
                {product.brand && <h3 className={styles.brand}>{product.brand}</h3>}
                <WishlistButton productId={product.id} />
                <div className={styles.footer}>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                    <Button type="button" onClick={handleAddToCart} disabled={status === 'loading'}>
                        {status === 'added' ? 'Agregado ✓' : status === 'loading' ? 'Agregando...' : 'Agregar al carrito'}
                    </Button>
                </div>
                {cartError && <p className={styles.cartError}>{cartError}</p>}
            </div>
        </div>
    )
}
