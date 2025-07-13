import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function NewEntryPage() {
  const navigate = useNavigate();

  // State for all fields
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [type, setType] = useState('');
  const [asset, setAsset] = useState('');
  const [bank, setBank] = useState('');
  const [serial, setSerial] = useState('');
  const [date, setDate] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [borrower, setBorrower] = useState('');
  const [engine, setEngine] = useState('');
  const [chassis, setChassis] = useState('');
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Save handler: POST data to backend
  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          registration_number: registrationNumber,
          asset,
          bank_name: bank,
          serial_number: serial,
          entry_datetime: date + ' ' + timestamp,
          borrower_name: borrower,
          engine_number: engine,
          chassis_number: chassis,
          mileage,
          condition,
          description
        })
      });
      if (response.ok) {
        setSuccess('Entry saved successfully!');
        // Optionally navigate to home or clear form
        setTimeout(() => navigate('/home'), 1000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to save entry');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  // Cancel handler: navigate to home page
  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSave}>
        <div className="form-section">
          <h3>General information of Asset</h3>
          <label>
            Registration Number:
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </label>
          <label>
            Asset:
            <input
              type="text"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            />
          </label>
          <label>
            Bank:
            <input
              type="text"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            />
          </label>
          <label>
            Serial:
            <input
              type="text"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Timestamp:
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
            />
          </label>
          <label>
            Borrower:
            <input
              type="text"
              value={borrower}
              onChange={(e) => setBorrower(e.target.value)}
            />
          </label>
          <label>
            Engine:
            <input
              type="text"
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
            />
          </label>
          <label>
            Chassis:
            <input
              type="text"
              value={chassis}
              onChange={(e) => setChassis(e.target.value)}
            />
          </label>
          <label>
            Mileage:
            <input
              type="text"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
          </label>
          <label>
            Condition:
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="form-section">
          <h3>Inventory of the asset</h3>
          {/* Render fields based on asset type (2/3/4 wheeler) */}
        </div>
        <div style={{ width: '100%', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: '1rem' }}>{success}</div>}
      </form>
    </>
  );
}

export default NewEntryPage;