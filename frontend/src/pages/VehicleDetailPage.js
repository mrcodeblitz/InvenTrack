import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => {
        setVehicle(data.vehicle);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <>
      <Navbar />
      <div>Loading...</div>
    </>
  );

  if (!vehicle) return (
    <>
      <Navbar />
      <div>No vehicle found.</div>
    </>
  );

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 600, margin: '32px auto', background: '#f8f9fa', padding: 24, borderRadius: 8 }}>
        <h2>Vehicle Details</h2>
        <div style={{ marginTop: 24 }}>
          <button>Edit</button>
          <button style={{ marginLeft: 8 }}>Mark Exit</button>
          <button style={{ marginLeft: 8 }} onClick={() => navigate(-1)}>Back</button>
        </div>
        <form>
          <div style={{ marginBottom: 12 }}>
            <label>Registration Number:</label>
            <input type="text" value={vehicle.registration_number || ''} readOnly style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Asset Type:</label>
            <input type="text" value={vehicle.asset_type || ''} readOnly style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Asset:</label>
            <input type="text" value={vehicle.asset || ''} readOnly style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Bank Name:</label>
            <input type="text" value={vehicle.bank_name || ''} readOnly style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Serial Number:</label>
            <input type="text" value={vehicle.serial_number || ''} readOnly style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Entry Date & Time:</label>
            <input type="text" value={vehicle.entry_datetime ? new Date(vehicle.entry_datetime).toLocaleString() : ''} readOnly style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Borrower Name:</label>
            <input type="text" value={vehicle.borrower_name || ''} readOnly style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Engine Number:</label>
            <input type="text" value={vehicle.engine_number || ''} readOnly style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Chassis Number:</label>
            <input type="text" value={vehicle.chassis_number || ''} readOnly style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Mileage:</label>
            <input type="text" value={vehicle.mileage || ''} readOnly style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Condition:</label>
            <input type="text" value={vehicle.condition || ''} readOnly style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Description:</label>
            <textarea value={vehicle.description || ''} readOnly style={{ width: '100%' }} />
          </div>
        </form>
        
      </div>
    </>
  );
}

export default VehicleDetailPage;