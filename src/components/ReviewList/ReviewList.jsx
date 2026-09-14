import { StarRating } from '../StarRating/StarRating.jsx';

export function ReviewList({ reviews }) {
    if (reviews.length === 0) {
        return <p>Todavía no hay reseñas para este producto</p>;
    }

    return (
        <ul>
            {reviews.map((review) => (
                <li key={review._id}>
                    <StarRating rating={review.rating} />
                    <p>{review.comment}</p>
                    <time dateTime={review.createdAt}>
                        {new Date(review.createdAt).toLocaleDateString()}
                    </time>
                </li>
            ))}
        </ul>
    );
}
