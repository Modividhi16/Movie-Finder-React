import { Link } from "react-router-dom";
import { FaHeart, FaTimes } from 'react-icons/fa';

const MovieCard = ({ movie, addToFavorites, removeFromFavorites, isFavorite, isFavoritesRow }) => {
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card">
      {/* Wrap the image in a Link for navigation, and apply hover effect here */}
      <div className="image-container">
        <Link to={`/movie/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </Link>

        
        {/* Movie details (rating & release date) - Show on hover */}
        <div className="movie-hover-info">
          <p>📅 {movie.release_date}</p>
        </div>

        {/* Show "Add to Your Favorite" on hover for movies row, if not favorited */}
        {!isFavoritesRow && !isFavorite && (
          <div className="favorite-overlay" onClick={handleFavoriteToggle}>
            <span>Add to Your Favorite</span>
            <FaHeart className="favorite-icon" />
          </div>
        )}
        {/* Show cross icon for favorites row */}
        {isFavoritesRow && (
          <div className="remove-favorite" onClick={handleFavoriteToggle}>
            <FaTimes className="remove-icon" />
          </div>
        )}
      </div>
      {/* Movie name Link, outside the hover effect */}
      <div className="movie-info">
        <Link to={`/movie/${movie.id}`}>
          <h3>{movie.title}</h3>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;