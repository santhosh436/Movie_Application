import React, { useState } from 'react';
import MovieIcon from '@mui/icons-material/Movie';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
  };

  const handleSort = (e) => {
    const val = e.target.value;
    if (val) navigate(`/sort/${val}`);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <MovieIcon className="movie-icon" />
          <h1 className="logo">MovieMasti</h1>
        </div>

        <div className="nav-links desktop-only">
          <NavLink to="/popular">Popular <span className="emoji">&#x1F525;</span></NavLink>
          <NavLink to="/upcoming">Upcoming <span className="emoji">&#x1F389;</span></NavLink>
          <NavLink to="/top-rated">Top Rated <span className="emoji">&#x2B50;</span></NavLink>

          {/* Toggle Button */}
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <NavLink to="/popular" onClick={() => setMobileMenuOpen(false)}>Popular 🔥</NavLink>
          <NavLink to="/upcoming" onClick={() => setMobileMenuOpen(false)}>Upcoming 🎉</NavLink>
          <NavLink to="/top-rated" onClick={() => setMobileMenuOpen(false)}>Top Rated ⭐</NavLink>

          <div className="mobile-filter-controls">
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

            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {isDarkMode ? <WbSunnyIcon /> : <Brightness2Icon />}
            </button>
          </div>
        </div>
      )}

      {/* Filter Bar (Desktop) */}
      <div className="filter-bar desktop-only">
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
