import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        // Handle successful login (e.g., save token, redirect)
        localStorage.setItem('token', data.token);
        window.location.href = '/home';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('something went wrong, please try again later');
    }
  };

  return (
    <>
      <Navbar showProfile={false} />
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
          {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        </form>
      </div>
    </>
  );
}

export default LoginPage;