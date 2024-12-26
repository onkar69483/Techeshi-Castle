import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existingTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    
    const newTeam = {
      id: Math.max(...existingTeams.map(t => t.id), 0) + 1,
      name: teamName,
      totalPoints: 0,
      challenge1: 0,
      challenge2: 0,
      challenge3: 0,
      completionTime: '0:00:00'
    };

    const updatedTeams = [...existingTeams, newTeam];
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    navigate('/admin');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-game-dark">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-gaming bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text mb-8">
          Create New Team
        </h1>
        <form onSubmit={handleSubmit} className="bg-game-card p-6 rounded-lg">
          <div className="mb-4">
            <label className="block font-gaming text-white mb-2">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-4 py-3 bg-game-dark rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-game-purple to-game-pink rounded-lg font-gaming text-white hover:opacity-90 transition-opacity"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam; 