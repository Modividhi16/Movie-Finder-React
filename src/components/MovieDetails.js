import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();  // Getting the movie id from the URL params
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);  // Fetch movie details when the id changes

  const fetchMovieDetails = async () => {
    // Use the id from URL to fetch details of the specific movie
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    );
    const data = await response.json();
    console.log(data);  
    setMovie(data);  // Set movie state with the fetched data
  };

  return (
    <div className="movie-details">
      <div className="background-overlay"></div> 

 <div className="movie-title">
    <h2>{movie.title}</h2>
  </div>
  
    <div className="movie-details-content">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  // Movie poster
          alt={movie.title}
        />
      </div>
      <div className="movie-overview">
        <p><strong>Overview:</strong> {movie.overview}</p>  {/* Movie overview */}
        <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>  {/* Movie rating */}
        <p><strong>Release Date:</strong> {movie.release_date}</p>  {/* Movie release date */}
      </div>
    </div>
  </div>
  );
};

export default MovieDetails;