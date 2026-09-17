import styles from './StarRating.module.css';

export function StarRating({ rating, max = 5 }) {
    return (
        <span className={styles.stars} aria-label={`${rating} de ${max} estrellas`}>
            {Array.from({ length: max }, (_, i) => (
                <span key={i} className={i < Math.round(rating) ? styles.filled : styles.empty} aria-hidden="true">
                    {i < Math.round(rating) ? '★' : '☆'}
                </span>
            ))}
        </span>
    );
}
