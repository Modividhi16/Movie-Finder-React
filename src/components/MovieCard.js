import { Link } from "react-router-dom";

const MovieCard = ({movie}) => {
    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="movie-card">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard;