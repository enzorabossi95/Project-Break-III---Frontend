import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api/products.js';

export function useProducts() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const products = await getProducts();
            setData(products);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts();
    }, [fetchProducts]);

    return { data, loading, error, refetch: fetchProducts };
}
