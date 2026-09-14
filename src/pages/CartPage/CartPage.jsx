import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, removeCartItem } from '../../store/cartSlice.js';
import { useProducts } from '../../hooks/useProducts.js';
import { CartItem } from '../../components/CartItem/CartItem.jsx';
import { CartSummary } from '../../components/CartSummary/CartSummary.jsx';

export function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading, error } = useSelector((state) => state.cart);
    const { data: products } = useProducts();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    // total es un dato derivado de items + products: se recalcula con useMemo, no vive en estado.
    const total = useMemo(() => {
        if (!products) return 0;
        return items.reduce((sum, item) => {
            const product = products.find((p) => p.id === item.productId);
            return product ? sum + product.price * item.quantity : sum;
        }, 0);
    }, [items, products]);

    function handleRemove(itemId) {
        dispatch(removeCartItem(itemId));
    }

    function handleGoToCheckout() {
        navigate('/checkout');
    }

    if (loading) return <div>Cargando carrito...</div>;
    if (error) return <div>Error al cargar el carrito</div>;

    return (
        <div>
            <h1>Mi carrito</h1>
            {items.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} onRemove={handleRemove} />
                    ))}
                    <CartSummary
                        total={total}
                        onCheckout={handleGoToCheckout}
                        disabled={items.length === 0}
                        label="Ir a pagar"
                    />
                </>
            )}
        </div>
    );
}
