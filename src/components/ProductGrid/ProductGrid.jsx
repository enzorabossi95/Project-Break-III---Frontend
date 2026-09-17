import { ProductCard } from '../ProductCard/ProductCard.jsx';
import styles from './ProductGrid.module.css';

export function ProductGrid ({ products }) {
    return (
        <div className={styles.grid}>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />))}
        </div>
    )
}
