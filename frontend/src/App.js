import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NewEntryPage from './pages/NewEntryPage';
import VehicleDetailPage from './pages/VehicleDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/new-entry" element={<NewEntryPage />} />
        <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;