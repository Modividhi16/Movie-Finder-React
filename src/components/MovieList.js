import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, addToFavorites, removeFromFavorites, favorites, isFavoritesRow }) => {
  return (
    <div className={`movie-container ${isFavoritesRow ? 'favorites-row' : ''}`}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorite={favorites.some((fav) => fav.id === movie.id)}
            isFavoritesRow={isFavoritesRow}
          />
        ))
      ) : (
        <p>{isFavoritesRow ? "No favorites yet." : "No movies found."}</p>
      )}
    </div>
  );
};

export default MovieList;