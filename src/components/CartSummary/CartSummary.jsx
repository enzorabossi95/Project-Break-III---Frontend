import { Button } from '../Button/Button.jsx';

export function CartSummary({ total, onCheckout, disabled, label = 'Finalizar compra' }) {
    return (
        <div>
            <h3>Total: ${total.toFixed(2)}</h3>
            <Button type="button" onClick={onCheckout} disabled={disabled}>
                {label}
            </Button>
        </div>
    );
}
