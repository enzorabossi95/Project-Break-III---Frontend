import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProduct } from '../../hooks/useProduct';
import { useReviews } from '../../hooks/useReviews';
import { addCartItem } from '../../store/cartSlice.js';
import { WishlistButton } from '../../components/WishlistButton/WishlistButton.jsx';
import { ReviewForm } from '../../components/ReviewForm/ReviewForm.jsx';
import { StarRating } from '../../components/StarRating/StarRating.jsx';
import { ReviewList } from '../../components/ReviewList/ReviewList.jsx';
import { Button } from '../../components/Button/Button.jsx';

export function ProductDetailPage() {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [cartStatus, setCartStatus] = useState('idle'); // idle | loading | added
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const { data: product, loading, error } = useProduct(id);
    const { data: reviews, loading: reviewsLoading, error: reviewsError, refetch: refetchReviews } = useReviews(id);

    // averageRating es un dato derivado de reviews: se recalcula con useMemo, no vive en estado.
    const averageRating = useMemo(() => {
        if (!reviews || reviews.length === 0) return 0;
        return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    }, [reviews]);

    if (loading) return <div>Cargando producto...</div>;
    if (error) return <div>Error al cargar el producto</div>;

    async function handleAddToCart() {
        setCartStatus('loading');
        try {
            await dispatch(addCartItem({ productId: product.id, quantity })).unwrap();
            setCartStatus('added');
            setTimeout(() => setCartStatus('idle'), 1500);
        } catch {
            setCartStatus('idle');
        }
    }

    return (
        <div>
            <h1>Detalle del Producto</h1>
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <h3>{product.brand}</h3>
            <WishlistButton productId={product.id} />
            <span>${product.price.toFixed(2)}</span>
            <p>{product.description}</p>
            <button onClick={() => setQuantity(quantity+1)}>+</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity > 1 ? quantity-1 : quantity)}>-</button>
            <Button type="button" onClick={handleAddToCart} disabled={cartStatus === 'loading'}>
                {cartStatus === 'added' ? 'Agregado ✓' : cartStatus === 'loading' ? 'Agregando...' : 'Agregar al carrito'}
            </Button>
            {reviewsLoading ? (
                <p>Cargando reviews...</p>
                ) : reviewsError ? (
                <p>Error al cargar las reviews</p>
                ) : (
                <>
                    <StarRating rating={averageRating} />
                    <span>({reviews.length} reviews)</span>
                    <ReviewList reviews={reviews} />
                </>
                )}
            {token && <ReviewForm productId={id} onReviewAdded={refetchReviews} />}
        </div>
    )
}
