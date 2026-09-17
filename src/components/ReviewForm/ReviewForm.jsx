import { useState } from 'react';
import { addReview } from '../../api/reviews.js';
import { Button } from '../Button/Button.jsx';
import styles from './ReviewForm.module.css';

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
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
                <span className={styles.label}>Puntaje</span>
                <select className={styles.select} value={rating} onChange={(e) => setRating(e.target.value)}>
                    {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </label>
            <label className={styles.field}>
                <span className={styles.label}>Comentario</span>
                <textarea className={styles.textarea} value={comment} onChange={(e) => setComment(e.target.value)} />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Enviar reseña'}
            </Button>
        </form>
    );
}
