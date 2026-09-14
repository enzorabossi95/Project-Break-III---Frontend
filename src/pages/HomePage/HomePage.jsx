import { ProductGrid } from '../../components/ProductGrid/ProductGrid.jsx';
import { useProducts } from '../../hooks/useProducts.js';

export function HomePage() {
    const { data: products, loading, error } = useProducts();

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error al cargar productos</div>;

    return (
        <div>
            <h2>DESTACADOS</h2>
            <ProductGrid products={products.slice(0, 3)} />
        </div>
    )
}