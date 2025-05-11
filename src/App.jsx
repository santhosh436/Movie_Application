import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import MovieList from './Components/MovieList';
import MovieDetails from './Components/MovieDetails/MovieDetails'; // Import the detail component
import './index.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
      <>
        <Navbar toggleTheme={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Navigate to="/popular" />} />
          <Route path="/popular" element={<MovieList category="popular" isDarkMode={isDarkMode} />} />
          <Route path="/top-rated" element={<MovieList category="top_rated" isDarkMode={isDarkMode} />} />
          <Route path="/upcoming" element={<MovieList category="upcoming" isDarkMode={isDarkMode} />} />
          <Route path="/filter/:rating" element={<MovieList isDarkMode={isDarkMode} />} />
          <Route path="/sort/:criteria" element={<MovieList isDarkMode={isDarkMode} />} />
          <Route path="/movie/:id" element={<MovieDetails isDarkMode={isDarkMode} />} /> {/* New route for movie details */}
        </Routes>
      </>
  );
};

export default App;
