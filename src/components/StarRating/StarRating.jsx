export function StarRating({ rating, max = 5 }) {
    return (
        <span aria-label={`${rating} de ${max} estrellas`}>
            {Array.from({ length: max }, (_, i) => (
                <span key={i} aria-hidden="true">{i < Math.round(rating) ? '★' : '☆'}</span>
            ))}
        </span>
    );
}
