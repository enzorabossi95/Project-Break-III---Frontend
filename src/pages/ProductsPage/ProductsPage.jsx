import { useState, useMemo } from 'react';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { useProducts } from '../../hooks/useProducts.js';
import styles from './ProductsPage.module.css';

export function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name-asc');
    const [category, setCategory] = useState('');
    const { data: products, loading, error } = useProducts();

    const categories = useMemo(() => {
        if (!products) return [];
        return [...new Set(products.map((p) => p.category).filter(Boolean))];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return products
            .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter((product) => !category || product.category === category)
            .slice()
            .sort((a, b) => {
                switch (sortBy) {
                    case 'price-asc':
                        return a.price - b.price;
                    case 'price-desc':
                        return b.price - a.price;
                    case 'name-desc':
                        return b.name.localeCompare(a.name);
                    default:
                        return a.name.localeCompare(b.name);
                }
            });
    }, [products, searchTerm, sortBy, category]);

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error al cargar productos</div>;

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Productos</h1>
            <div className={styles.categoryTabs}>
                <Button
                    type="button"
                    variant={category === '' ? 'primary' : 'secondary'}
                    onClick={() => setCategory('')}
                >
                    Todos
                </Button>
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        type="button"
                        variant={category === cat ? 'primary' : 'secondary'}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                    </Button>
                ))}
            </div>
            <div className={styles.controls}>
                <input
                    className={styles.search}
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select className={styles.sort} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name-asc">Nombre (A-Z)</option>
                    <option value="name-desc">Nombre (Z-A)</option>
                    <option value="price-asc">Precio (menor a mayor)</option>
                    <option value="price-desc">Precio (mayor a menor)</option>
                </select>
            </div>
            {filteredProducts.length === 0 ? (
                <p className={styles.emptyState}>No se encontraron productos.</p>
            ) : (
                <ProductGrid products={filteredProducts} />
            )}
        </div>
    )
}
