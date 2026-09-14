import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistThunk } from '../../store/wishlistSlice.js';

export function WishlistButton({ productId }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const productIds = useSelector((state) => state.wishlist.productIds);
    const isInWishlist = productIds.includes(productId);

    if (!token) return null;

    function handleClick() {
        dispatch(toggleWishlistThunk(productId));
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={isInWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
            {isInWishlist ? '★' : '☆'}
        </button>
    );
}
