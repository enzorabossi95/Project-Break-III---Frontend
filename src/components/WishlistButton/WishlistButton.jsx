import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistThunk } from '../../store/wishlistSlice.js';
import styles from './WishlistButton.module.css';

export function WishlistButton({ productId }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const productIds = useSelector((state) => state.wishlist.productIds);
    const isInWishlist = productIds.includes(productId);

    if (!user) return null;

    function handleClick() {
        dispatch(toggleWishlistThunk(productId));
    }

    return (
        <button
            type="button"
            className={`${styles.button} ${isInWishlist ? styles.active : ''}`}
            onClick={handleClick}
            aria-label={isInWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
            {isInWishlist ? '★' : '☆'}
        </button>
    );
}
