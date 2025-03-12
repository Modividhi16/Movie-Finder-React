import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import SearchBar from './components/SearchBar';
import { Routes, Route } from "react-router-dom";

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovies = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      let url;
      if (!query) {
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
      } else {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    fetchMovies(query);
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter((fav) => fav.id !== movieId));
  };

  return (
    <div>
      <h1>Movie Finder</h1>
      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>Movies</h2>
              <MovieList
                movies={movies}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                favorites={favorites}
                isFavoritesRow={false} // For movies row
              />
              <h2>Favourites</h2>
              <MovieList
                movies={favorites}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                favorites={favorites}
                isFavoritesRow={true} // For favorites row
              />
            </div>
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;