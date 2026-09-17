import { useState, useEffect, useCallback } from 'react';
import { getReviews } from '../api/reviews';

export function useReviews(productId) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        try {
            const reviews = await getReviews(productId);
            setData(reviews);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchReviews();
    }, [fetchReviews]);

    return { data, loading, error, refetch: fetchReviews };
}
