import { StarRating } from '../StarRating/StarRating.jsx';
import styles from './ReviewList.module.css';

export function ReviewList({ reviews }) {
    if (reviews.length === 0) {
        return <p className={styles.empty}>Todavía no hay reseñas para este producto</p>;
    }

    return (
        <ul className={styles.list}>
            {reviews.map((review) => (
                <li key={review._id}>
                    <StarRating rating={review.rating} />
                    <p className={styles.comment}>{review.comment}</p>
                    <time className={styles.date} dateTime={review.createdAt}>
                        {new Date(review.createdAt).toLocaleDateString()}
                    </time>
                </li>
            ))}
        </ul>
    );
}
