import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCart, checkoutThunk } from '../../store/cartSlice.js';
import { useProducts } from '../../hooks/useProducts.js';
import { CartSummary } from '../../components/CartSummary/CartSummary.jsx';

export function CheckoutPage() {
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

    async function handleConfirm() {
        try {
            const order = await dispatch(checkoutThunk()).unwrap();
            navigate('/checkout-success', { state: { order } });
        } catch {
            // el error ya queda reflejado en el estado global (state.cart.error)
        }
    }

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar el carrito</div>;

    if (items.length === 0) {
        return (
            <div>
                <h1>Confirmar compra</h1>
                <p>Tu carrito está vacío</p>
                <Link to="/products">Ir a productos</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Confirmar compra</h1>
            <ul>
                {items.map((item) => {
                    const product = products?.find((p) => p.id === item.productId);
                    return (
                        <li key={item.id}>
                            {product ? product.name : item.productId} x {item.quantity}
                        </li>
                    );
                })}
            </ul>
            <CartSummary
                total={total}
                onCheckout={handleConfirm}
                disabled={items.length === 0}
                label="Confirmar compra"
            />
        </div>
    );
}
