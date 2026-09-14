import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../store/cartSlice.js';
import { WishlistButton } from '../WishlistButton/WishlistButton.jsx';

export function ProductCard({ product }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState('idle'); // idle | loading | added

    async function handleAddToCart() {
        setStatus('loading');
        try {
            await dispatch(addCartItem({ productId: product.id, quantity: 1 })).unwrap();
            setStatus('added');
            setTimeout(() => setStatus('idle'), 1500);
        } catch {
            setStatus('idle');
        }
    }

    return (
        <div>
            <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} alt={product.name} />
                <h2>{product.name}</h2>
            </Link>
            <h3>{product.brand}</h3>
            <WishlistButton productId={product.id} />
            <span>${product.price.toFixed(2)}</span>
            <button type="button" onClick={handleAddToCart} disabled={status === 'loading'}>
                {status === 'added' ? 'Agregado ✓' : status === 'loading' ? 'Agregando...' : 'Agregar al carrito'}
            </button>
        </div>
    )
}
