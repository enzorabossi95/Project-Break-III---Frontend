import { ProductCard } from '../ProductCard/ProductCard.jsx';

export function ProductGrid ({ products }) {
    return (
        <div>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />))}
        </div>
    )
}