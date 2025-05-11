import React from 'react';
import MovieIcon from '@mui/icons-material/Movie';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getRouteLabel = () => {
    if (location.pathname.startsWith('/popular')) return 'Popular 🔥';
    if (location.pathname.startsWith('/top-rated')) return 'Top Rated ⭐';
    if (location.pathname.startsWith('/upcoming')) return 'Upcoming 🎉';
    if (location.pathname.startsWith('/filter')) return 'Filtered 🔍';
    if (location.pathname.startsWith('/sort')) return 'Sorted 📊';
    return 'Movies 🎬';
  };

  const handleFilter = (e) => {
    const val = e.target.value;
    if (val) navigate(`/filter/${val}`);
  };

  const handleSort = (e) => {
    const val = e.target.value;
    if (val) navigate(`/sort/${val}`);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <MovieIcon className="movie-icon" />
          <h1 className="logo">MovieMasti</h1>
        </div>

        <div className="nav-links">
          <NavLink to="/popular">Popular <span className="emoji">&#x1F525;</span></NavLink>
          <NavLink to="/upcoming">Upcoming <span className="emoji">&#x1F389;</span></NavLink>
          <NavLink to="/top-rated">Top Rated <span className="emoji">&#x2B50;</span></NavLink>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {isDarkMode ? <WbSunnyIcon /> : <Brightness2Icon />}
          </button>
        </div>
      </nav>

      {/* Filter/Sort Section */}
      <div className="filter-bar">
        <div className="route-name">{getRouteLabel()}</div>

        <div className="filter-controls">
          <select onChange={handleFilter} defaultValue="">
            <option value="">Filter by Rating</option>
            <option value="6">6+ Stars</option>
            <option value="7">7+ Stars</option>
          </select>

          <select onChange={handleSort} defaultValue="">
            <option value="">Sort by</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
            <option value="alphabet">Alphabet</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;
