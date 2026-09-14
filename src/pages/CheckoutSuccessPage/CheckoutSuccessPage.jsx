import { useLocation, Link } from 'react-router-dom';

export function CheckoutSuccessPage() {
    const location = useLocation();
    const order = location.state?.order;

    return (
        <div>
            <h1>¡Compra realizada con éxito!</h1>
            {order && <p>Pedido #{order.id} — Total: ${order.total.toFixed(2)}</p>}
            <Link to="/products">Seguir comprando</Link>
        </div>
    );
}
