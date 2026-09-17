import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../../store/wishlistSlice.js';
import { useProducts } from '../../hooks/useProducts.js';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid.jsx';
import styles from './WishlistPage.module.css';

export function WishlistPage() {
    const dispatch = useDispatch();
    const { productIds, loading, error } = useSelector((state) => state.wishlist);
    const { data: products, loading: productsLoading } = useProducts();

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    const wishlistProducts = useMemo(() => {
        if (!products) return [];
        return products.filter((p) => productIds.includes(p.id));
    }, [products, productIds]);

    if (loading || productsLoading) return <div>Cargando favoritos...</div>;
    if (error) return <div>Error al cargar favoritos</div>;

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Mis favoritos</h1>
            {wishlistProducts.length === 0 ? (
                <p className={styles.empty}>Todavía no agregaste productos a favoritos</p>
            ) : (
                <ProductGrid products={wishlistProducts} />
            )}
        </div>
    );
}
