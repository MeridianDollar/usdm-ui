import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PageSwitcher.css'; // Import the CSS file

const PageSwitcher = () => {
  const location = useLocation(); // Get the current location
  const [activePage, setActivePage] = useState(location.pathname); // Initialize activePage state with current path

  const handlePageChange = (path: string) => {
    setActivePage(path); // Update activePage state when a button is clicked
  };

  return (
    <div className="page-switcher-container">
        <div className="page-switcher">
        <Link to="/" className={`page-switcher-button ${activePage === '/trove' ? 'active' : ''}`} onClick={() => handlePageChange('/trove')}>
            Trove
        </Link>
        <Link to="/pool" className={`page-switcher-button ${activePage === '/pool' ? 'active' : ''}`} onClick={() => handlePageChange('/pool')}>
            Stability
        </Link>
        <Link to="/staking" className={`page-switcher-button ${activePage === '/staking' ? 'active' : ''}`} onClick={() => handlePageChange('/staking')}>
            Staking
        </Link>
        </div>
    </div>
  );
};

export default PageSwitcher;

