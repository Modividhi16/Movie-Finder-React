import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({movies}) => {
    return (
        <div className="movie-container">
            {movies.length > 0 && movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ) )}
        </div>
    );
};

export default MovieList;