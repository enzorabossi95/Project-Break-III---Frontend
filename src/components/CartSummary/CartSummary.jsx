import { Button } from '../Button/Button.jsx';
import styles from './CartSummary.module.css';

export function CartSummary({ total, onCheckout, disabled, label = 'Finalizar compra' }) {
    return (
        <div className={styles.summary}>
            <h3 className={styles.total}>Total: ${total.toFixed(2)}</h3>
            <Button type="button" onClick={onCheckout} disabled={disabled}>
                {label}
            </Button>
        </div>
    );
}
