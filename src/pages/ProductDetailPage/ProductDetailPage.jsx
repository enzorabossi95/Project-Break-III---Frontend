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
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [cartStatus, setCartStatus] = useState('idle');
    const [cartError, setCartError] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { data: product, loading, error } = useProduct(id);
    const { data: reviews, loading: reviewsLoading, error: reviewsError, refetch: refetchReviews } = useReviews(id);

    const averageRating = useMemo(() => {
        if (!reviews || reviews.length === 0) return 0;
        return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    }, [reviews]);

    if (loading) return <div>Cargando producto...</div>;
    if (error) return <div>Error al cargar el producto</div>;

    async function handleAddToCart() {
        setCartStatus('loading');
        setCartError(null);
        try {
            await dispatch(addCartItem({ productId: product.id, quantity })).unwrap();
            setCartStatus('added');
            setTimeout(() => setCartStatus('idle'), 1500);
        } catch {
            setCartStatus('idle');
            setCartError('No se pudo agregar al carrito. Verificá el stock disponible.');
        }
    }

    return (
        <div>
            <div className={styles.layout}>
                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={product.imageUrl} alt={product.name} />
                </div>
                <div className={styles.info}>
                    <h1 className={styles.name}>{product.name}</h1>
                    {product.brand && <h3 className={styles.brand}>{product.brand}</h3>}
                    <WishlistButton productId={product.id} />
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                    <div className={styles.quantityRow}>
                        <button
                            className={styles.quantityButton}
                            type="button"
                            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
                        >
                            -
                        </button>
                        <span className={styles.quantityValue}>{quantity}</span>
                        <button
                            className={styles.quantityButton}
                            type="button"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <Button type="button" onClick={handleAddToCart} disabled={cartStatus === 'loading'}>
                        {cartStatus === 'added' ? 'Agregado ✓' : cartStatus === 'loading' ? 'Agregando...' : 'Agregar al carrito'}
                    </Button>
                    {cartError && <p className={styles.cartError}>{cartError}</p>}
                    <p className={styles.description}>{product.description}</p>
                </div>
            </div>
            <div className={styles.reviewsSection}>
                {reviewsLoading ? (
                    <p>Cargando reviews...</p>
                    ) : reviewsError ? (
                    <p>Error al cargar las reviews</p>
                    ) : (
                    <>
                        <div className={styles.reviewsHeader}>
                            <StarRating rating={averageRating} />
                            <span className={styles.reviewsCount}>({reviews.length} reviews)</span>
                        </div>
                        <ReviewList reviews={reviews} />
                    </>
                    )}
                {user && (
                    showReviewForm ? (
                        <ReviewForm
                            productId={id}
                            onReviewAdded={() => {
                                refetchReviews();
                                setShowReviewForm(false);
                            }}
                        />
                    ) : (
                        <div className={styles.writeReviewButton}>
                            <Button type="button" variant="secondary" onClick={() => setShowReviewForm(true)}>
                                Escribir una reseña
                            </Button>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
