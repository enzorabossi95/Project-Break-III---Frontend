import { useState, useMemo } from 'react';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid.jsx';
import { useProducts } from '../../hooks/useProducts.js';

export function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name-asc');
    const { data: products, loading, error } = useProducts();

    // filteredProducts es un dato derivado de products + searchTerm + sortBy:
    // no lo guardamos en estado, lo recalculamos con useMemo solo cuando cambia alguna dependencia.
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return products
            .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice() // copia antes de sort(), para no mutar el array de products
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
    }, [products, searchTerm, sortBy]);

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error al cargar productos</div>;

    return (
        <div>
            <h1>Productos</h1>
            <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name-asc">Nombre (A-Z)</option>
                <option value="name-desc">Nombre (Z-A)</option>
                <option value="price-asc">Precio (menor a mayor)</option>
                <option value="price-desc">Precio (mayor a menor)</option>
            </select>
            <ProductGrid products={filteredProducts} />
        </div>
    )
}
