import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock credentials (in real app, these would be in backend)
  const MOCK_ADMIN = {
    username: import.meta.env.VITE_MOCK_ADMIN_USERNAME,
    password: import.meta.env.VITE_MOCK_ADMIN_PASSWORD,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === MOCK_ADMIN.username && 
        credentials.password === MOCK_ADMIN.password) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-game-dark">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-4xl font-gaming bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text mb-8 text-center">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="bg-game-card p-6 rounded-lg">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-500 text-sm">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block font-gaming text-white mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-3 bg-game-dark rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-gaming text-white mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 bg-game-dark rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-game-purple to-game-pink rounded-lg font-gaming text-white hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;