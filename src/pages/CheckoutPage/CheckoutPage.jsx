import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, createStripeSessionThunk } from '../../store/cartSlice.js';
import { useProducts } from '../../hooks/useProducts.js';
import { CartSummary } from '../../components/CartSummary/CartSummary.jsx';
import styles from './CheckoutPage.module.css';

export function CheckoutPage() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.cart);
    const { data: products } = useProducts();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const total = useMemo(() => {
        if (!products) return 0;
        return items.reduce((sum, item) => {
            const product = products.find((p) => p.id === item.productId);
            return product ? sum + product.price * item.quantity : sum;
        }, 0);
    }, [items, products]);

    async function handlePay() {
        try {
            const url = await dispatch(createStripeSessionThunk()).unwrap();
            window.location.href = url;
        } catch {
            // no-op
        }
    }

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar el carrito</div>;

    if (items.length === 0) {
        return (
            <div>
                <h1 className={styles.title}>Confirmar compra</h1>
                <p className={styles.empty}>Tu carrito está vacío</p>
                <Link className={styles.link} to="/products">Ir a productos</Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className={styles.title}>Confirmar compra</h1>
            <ul className={styles.list}>
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
                onCheckout={handlePay}
                disabled={items.length === 0}
                label="Pagar con Stripe"
            />
        </div>
    );
}
