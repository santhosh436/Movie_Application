import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieList.css';

const MovieList = ({ category = 'popular', isDarkMode }) => {
  const [movies, setMovies] = useState([]);
  const { rating, criteria } = useParams();
  const TMDB_API_KEY = 'feae4f9bc7dc63542ee345c22c1208a8';
  const OMDB_API_KEY = 'c860c97';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        let filteredMovies = data.results;

        // Filter by rating
        if (rating) {
          const minRating = parseFloat(rating);
          filteredMovies = filteredMovies.filter((movie) => movie.vote_average >= minRating);
        }

        // Sort movies
        if (criteria) {
          if (criteria === 'rating') {
            filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
          } else if (criteria === 'year') {
            filteredMovies.sort((a, b) =>
              (b.release_date || '').localeCompare(a.release_date || '')
            );
          } else if (criteria === 'alphabet') {
            filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
          }
        }

        // Fetch poster from OMDb
        const moviesWithPosters = await Promise.all(
          filteredMovies.map(async (movie) => {
            try {
              const omdbRes = await fetch(
                `https://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&apikey=${OMDB_API_KEY}`
              );
              const omdbData = await omdbRes.json();

              const finalPoster =
                omdbData.Poster && omdbData.Poster !== 'N/A'
                  ? omdbData.Poster
                  : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

              return { ...movie, finalPoster };
            } catch (err) {
              console.warn(`OMDb error for "${movie.title}":`, err);
              return {
                ...movie,
                finalPoster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              };
            }
          })
        );

        setMovies(moviesWithPosters);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [category, rating, criteria]);

  return (
    <div className={`movie-container ${isDarkMode ? 'dark' : 'light'}`}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => window.location.href = `/movie/${movie.id}`}
          >
            <img
              src={movie.finalPoster}
              alt={movie.title}
              className="movie-poster"
            />
            <h3>{movie.title}</h3>
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center', padding: '2rem' }}>No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;
