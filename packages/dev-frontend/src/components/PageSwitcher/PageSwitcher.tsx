import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PageSwitcher.css'; // Import the CSS file
import { useLiquity } from "../../hooks/LiquityContext";

const PageSwitcher: React.FC = () => {
  const location = useLocation(); // Get the current location
  const [activePage, setActivePage] = useState<string>(location.pathname); // Initialize activePage state with current path

  const { collateral } = useLiquity();

  const handlePageChange = (path: string) => {
    setActivePage(path); // Update activePage state when a button is clicked
  };

  useEffect(() => {
    setActivePage(location.pathname); // Update activePage when location changes
  }, [location]);

  return (
    <div className="page-switcher-container">
      <div className="page-switcher">
        <Link to="/trove" className={`page-switcher-button ${activePage === '/trove' ? 'active' : ''}`} onClick={() => handlePageChange('/trove')}>
          Trove
        </Link>
        <Link to="/pool" className={`page-switcher-button ${activePage === '/pool' ? 'active' : ''}`} onClick={() => handlePageChange('/pool')}>
          Stability
        </Link>
        {collateral !== "FUSE" && collateral !== "TARA" && (
          <Link to="/staking" className={`page-switcher-button ${activePage === '/staking' ? 'active' : ''}`} onClick={() => handlePageChange('/staking')}>
            Staking
          </Link>
        )}
      </div>
    </div>
  );
};

export default PageSwitcher;
