import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmStripeCheckoutThunk } from '../../store/cartSlice.js';
import styles from './CheckoutSuccessPage.module.css';

export function CheckoutSuccessPage() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const dispatch = useDispatch();
    const [status, setStatus] = useState('confirming');
    const [order, setOrder] = useState(null);
    const confirmedSessionId = useRef(null);

    useEffect(() => {
        if (!sessionId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStatus('error');
            return;
        }

        if (confirmedSessionId.current === sessionId) return;
        confirmedSessionId.current = sessionId;

        dispatch(confirmStripeCheckoutThunk(sessionId))
            .unwrap()
            .then((result) => {
                setOrder(result);
                setStatus('success');
            })
            .catch(() => setStatus('error'));
    }, [sessionId, dispatch]);

    if (status === 'confirming') {
        return <div className={styles.page}>Confirmando tu pago...</div>;
    }

    if (status === 'error') {
        return (
            <div className={styles.page}>
                <h1>No pudimos confirmar tu pago</h1>
                <p>Si ya pagaste y ves este mensaje, contactanos para verificar tu pedido.</p>
                <Link className={styles.link} to="/cart">Volver al carrito</Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <h1>¡Compra realizada con éxito!</h1>
            {order && <p className={styles.order}>Pedido #{order.id} — Total: ${order.total.toFixed(2)}</p>}
            <Link className={styles.link} to="/products">Seguir comprando</Link>
        </div>
    );
}
