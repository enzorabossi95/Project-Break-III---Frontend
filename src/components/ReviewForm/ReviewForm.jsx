import { useState } from 'react';
import { addReview } from '../../api/reviews.js';
import { Button } from '../Button/Button.jsx';

export function ReviewForm({ productId, onReviewAdded }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            const review = await addReview(productId, { rating: Number(rating), comment });
            setComment('');
            onReviewAdded?.(review);
        } catch {
            setError('No se pudo enviar la reseña');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Puntaje
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </label>
            <label>
                Comentario
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </label>
            {error && <p>{error}</p>}
            <Button type="submit" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Enviar reseña'}
            </Button>
        </form>
    );
}
