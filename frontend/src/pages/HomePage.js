import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [recentVehicles, setRecentVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0); // Add this line
  const [searchRegNum, setSearchRegNum] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleAddNewEntry = () => {
    navigate('/new-entry');
  };

  const handleSearch = () => {
    if (!searchRegNum.trim()) {
      setSearchError('Please enter a registration number.');
      setSearchResult(null); // <-- Change this line
      return;
    }
    setSearchLoading(true);
    setSearchError('');
    fetch(`http://localhost:5000/api/vehicles/search?registration_number=${encodeURIComponent(searchRegNum)}`)
      .then(res => res.json())
      .then(data => {
        setSearchResult(data.vehicles || []);
        setSearchLoading(false);
      })
      .catch(() => {
        setSearchError('Failed to fetch search results.');
        setSearchLoading(false);
      });
  };

  useEffect(() => {
    // Fetch last 10 vehicles
    fetch('http://localhost:5000/api/vehicles?limit=10')
      .then(res => res.json())
      .then(data => {
        setRecentVehicles(data.vehicles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch total vehicle count
    fetch('http://localhost:5000/api/vehicles/count')
      .then(res => res.json())
      .then(data => setTotalCount(data.count || 0));
  }, []);

  return (
    <>
      <Navbar onLogout={handleLogout} showProfile={true} />
      <div className='actions-section'>
        <div className="search-section">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearch();
            }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <input
              type="text"
              placeholder="Search by Registration Number"
              value={searchRegNum}
              onChange={e => setSearchRegNum(e.target.value)}
              required
              pattern="[A-Za-z0-9\- ]{1,15}" // Adjust pattern as needed
              title="Enter a valid registration number (1-15 characters, letters, numbers, hyphens, spaces)"
              style={{ marginRight: '8px' }}
            />
            <button type="submit">Search</button>
          </form>
          {searchError && (
            <div style={{ color: 'red', marginTop: '8px', marginLeft: '8px' }}>
              {searchError}
            </div>
          )}
        </div>
        <div className="new-entry-section">
          <button onClick={handleAddNewEntry} style={{ padding: '6px 16px', borderRadius: '4px', fontSize: '1rem' }}>Add New Entry</button>
        </div>
      </div>
      {/* Show search results only when searchResult is not null */}
      {searchResult !== null ? (
        <div className="search-results-section">
          <h2>Search Results</h2>
          {searchLoading ? (
            <div>Loading...</div>
          ) : searchResult.length === 0 ? (
            <div>No records found.</div>
          ) : (
            <table className="search-results-table">
              <thead>
                <tr>
                  <th>Vehicle Registration Number</th>
                  <th>Vehicle Type</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map(vehicle => (
                  <tr
                    key={vehicle.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                  >
                    <td>{vehicle.registration_number}</td>
                    <td>{vehicle.asset_type}</td>
                    <td>{vehicle.entry_datetime ? new Date(vehicle.entry_datetime).toLocaleString() : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <>
          <div className="dashboard-section">
            <h3>Total Vehicles: {totalCount}</h3>
            {/* Mini dashboard with stats */}
          </div>
          <div className="recent-vehicles-section">
            <h2>Recent Vehicles</h2>
            {loading ? (
              <div>Loading...</div>
            ) : recentVehicles.length === 0 ? (
              <div>No records found.</div>
            ) : (
              <table className="recent-vehicles-table">
                <thead>
                  <tr>
                    <th>Vehicle Registration Number</th>
                    <th>Vehicle Type</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentVehicles.map(vehicle => (
                    <tr
                      key={vehicle.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                    >
                      <td>{vehicle.registration_number}</td>
                      <td>{vehicle.asset_type}</td>
                      <td>{vehicle.entry_datetime ? new Date(vehicle.entry_datetime).toLocaleString() : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;