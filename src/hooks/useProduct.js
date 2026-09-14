import {useState, useEffect} from 'react';
import {getProductById} from '../api/products';

export function useProduct(id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true);
            try {
                const product = await getProductById(id);
                setData(product);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    return { data, loading, error };
}