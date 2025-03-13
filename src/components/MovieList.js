import React, { useRef, useEffect } from "react";
import "../App.css"; 
import MovieCard from "./MovieCard";

const MovieList = ({ movies, addToFavorites, removeFromFavorites, favorites, isFavoritesRow }) => {
    const listRef = useRef(null);
  
    // Function to handle horizontal scroll with mouse wheel
    useEffect(() => {
      const handleScroll = (event) => {
        if (listRef.current) {
          event.preventDefault(); // Prevent default vertical scrolling
          listRef.current.scrollLeft += event.deltaY * 2; // Adjust scroll speed
        }
      };
  
      const movieContainer = listRef.current;
      if (movieContainer) {
        movieContainer.addEventListener("wheel", handleScroll);
      }
  
      return () => {
        if (movieContainer) {
          movieContainer.removeEventListener("wheel", handleScroll);
        }
      };
    }, []);

    // Function to scroll left
    const scrollLeft = () => {
        if (listRef.current) {
          listRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
      };
    

      // Function to scroll right
      const scrollRight = () => {
        if (listRef.current) {
          listRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      };
  
    return (
      <div className="movie-list-container">

   

        {/* Left Scroll Button */}
      <button className="scroll-btn left" onClick={scrollLeft}>
        ◀
      </button>

        <div ref={listRef} className={`movie-container ${isFavoritesRow ? "favorites-row" : ""}`}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isFavorite={favorites?.some((fav) => fav.id === movie.id)}
                isFavoritesRow={isFavoritesRow}
              />
            ))
          ) : (
            <p>{isFavoritesRow ? "No favorites yet." : "No movies found."}</p>
          )};
        </div>
        
      {/* Right Scroll Button */}
      <button className="scroll-btn right" onClick={scrollRight}>
        ▶
      </button>
      </div>
    );
  };

export default MovieList;
