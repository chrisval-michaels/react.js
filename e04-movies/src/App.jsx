import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import YouTube from "react-youtube";
import "./App.css";

// Get API key from .env
const API_KEY = import.meta.env.VITE_API_KEY;

// MovieItem Component
function MovieItem({ movie }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`
      )
      .then((res) => setMovieDetails(res.data));
  }, [movie.id]);

  const IMAGEPATH = "http://image.tmdb.org/t/p/w500";
  const imageurl = IMAGEPATH + movie.poster_path;

  // Genres
  const genres = movieDetails.genres?.map((g) => g.name).join(", ");

  // First YouTube trailer key
  const videoKey = movieDetails.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  )?.key;

  return (
    <div className="movie-card">
      <img src={imageurl} alt={movie.original_title} />
      <h3>{movie.original_title}</h3>
      <p>Rating: {movie.vote_average}</p>
      <p>Genres: {genres}</p>

      {videoKey && (
        <button onClick={() => setIsOpen(true)} className="trailer-btn">
          ▶ Watch Trailer
        </button>
      )}

      {/* Modal for YouTube trailer */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Movie Trailer"
        className="modal"
        overlayClassName="overlay"
      >
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          Close
        </button>
        {videoKey && <YouTube videoId={videoKey} opts={{ width: "100%", height: "400" }} />}
      </Modal>
    </div>
  );
}

// MovieList Component
function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <p>Loading, please wait...</p>
      </div>
    );
  }
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieItem key={index} movie={movie} />
      ))}
    </div>
  );
}

// Main App Component
function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
      )
      .then((res) => setMovies(res.data.results));
  }, []);

  return (
    <div className="App">
      <h1>Now Playing Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
