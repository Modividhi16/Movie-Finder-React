import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import {Routes, Route } from "react-router-dom";
const apiKey = process.env.REACT_APP_MOVIE_API_KEY;

const api_url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(api_url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results || []);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div>
        <h1>Movie Finder</h1>
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;

