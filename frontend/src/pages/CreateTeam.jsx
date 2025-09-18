import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const CreateTeam = () => {
  const [teamData, setTeamData] = useState({
    teamName: '',
    college: '',
    contact: '',
    players: [''],
    challengeScores: {
      challenge1: 0,
      challenge2: 0,
      challenge3: 0,
    },
    totalScore: 0,
  });

  const [showChallengeScores, setShowChallengeScores] = useState(true);
  const [contactError, setContactError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Retrieve saved form data when component mounts
    const savedFormData = sessionStorage.getItem('createTeamFormData');
    if (savedFormData) {
      setTeamData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    const { challenge1, challenge2, challenge3 } = teamData.challengeScores;
    const totalScore = Number(challenge1) + Number(challenge2) + Number(challenge3);
    setTeamData((prev) => ({ ...prev, totalScore }));
  }, [teamData.challengeScores]);

  const handleInputChange = (key, value) => {
    if (key === 'contact') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length > 10) {
        setContactError('Phone number cannot exceed 10 digits');
        return;
      }
      setContactError('');
      setTeamData((prev) => ({
        ...prev,
        [key]: numericValue,
      }));
    } else {
      setTeamData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handlePlayerChange = (index, value) => {
    const updatedPlayers = [...teamData.players];
    updatedPlayers[index] = value;
    setTeamData((prev) => ({
      ...prev,
      players: updatedPlayers,
    }));
  };

  const handleAddPlayer = () => {
    if (teamData.players.length < 4) {
      setTeamData((prev) => ({
        ...prev,
        players: [...prev.players, ''],
      }));
    } else {
      alert("Maximum Players Selected");
    }
  };

  const handleChallengeScoreChange = (key, value) => {
    const numValue = value === '' ? 0 : Number(value);
    setTeamData((prev) => ({
      ...prev,
      challengeScores: {
        ...prev.challengeScores,
        [key]: numValue,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/teams`, {
        team_name: teamData.teamName,
        college: teamData.college,
        contact: Number(teamData.contact),
        challenge_1_score: teamData.challengeScores.challenge1,
        challenge_2_score: teamData.challengeScores.challenge2,
        challenge_3_score: teamData.challengeScores.challenge3,
        total_score: teamData.totalScore,
        players: teamData.players,
      });
      console.log('Team saved:', response.data);
      sessionStorage.removeItem('createTeamFormData');
      navigate('/admin');
    } catch (error) {
      console.error('Error saving team:', error.response?.data || error.message);
      alert('Failed to save the team. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-game-dark">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-gaming bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text mb-8">
          Create New Team
        </h1>
        <form onSubmit={handleSubmit} className="bg-game-card p-6 rounded-lg">
          {/* Team Name */}
          <div className="mb-4">
            <label className="block font-gaming text-white mb-2">Team Name</label>
            <input
              type="text"
              value={teamData.teamName}
              onChange={(e) => handleInputChange('teamName', e.target.value)}
              className="w-full px-4 py-3 bg-game-dark rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
              required
            />
          </div>
          {/* College */}
          <div className="mb-4">
            <label className="block font-gaming text-white mb-2">College</label>
            <input
              type="text"
              value={teamData.college}
              onChange={(e) => handleInputChange('college', e.target.value)}
              className="w-full px-4 py-3 bg-game-dark rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
              required
            />
          </div>
          {/* Contact */}
          <div className="mb-4">
            <label className="block font-gaming text-white mb-2">Contact Number</label>
            <input
              type="number"
              value={teamData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              className="w-full px-4 py-3 bg-game-dark rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
              required
            />
            {contactError && (
              <p className="text-red-500 text-sm mt-1">{contactError}</p>
            )}
          </div>
          {/* Players */}
          <div className="mb-4">
            <label className="block font-gaming text-white mb-2">Player Names</label>
            {teamData.players.map((player, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={player}
                  onChange={(e) => handlePlayerChange(index, e.target.value)}
                  className="w-full px-4 py-3 bg-game-dark rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
                  placeholder={`Player ${index + 1}`}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddPlayer}
              className="mt-2 px-4 py-2 bg-gradient-to-r from-game-purple to-game-pink rounded-lg font-gaming text-white hover:opacity-90 transition-opacity"
            >
              + Add Player
            </button>
          </div>
          {/* Challenge Scores */}
          {showChallengeScores && (
            <>
              <div className="mb-4">
                <label className="block font-gaming text-white mb-2">Challenge 1 Score</label>
                <input
                  type="number"
                  value={teamData.challengeScores.challenge1}
                  onChange={(e) =>
                    handleChallengeScoreChange('challenge1', e.target.value)
                  }
                  className="w-full px-4 py-3 bg-game-dark rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block font-gaming text-white mb-2">Challenge 2 Score</label>
                <input
                  type="number"
                  value={teamData.challengeScores.challenge2}
                  onChange={(e) =>
                    handleChallengeScoreChange('challenge2', e.target.value)
                  }
                  className="w-full px-4 py-3 bg-game-dark rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block font-gaming text-white mb-2">Challenge 3 Score</label>
                <input
                  type="number"
                  value={teamData.challengeScores.challenge3}
                  onChange={(e) =>
                    handleChallengeScoreChange('challenge3', e.target.value)
                  }
                  className="w-full px-4 py-3 bg-game-dark rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block font-gaming text-white mb-2">Total Score</label>
                <input
                  type="number"
                  value={teamData.totalScore}
                  disabled
                  className="w-full px-4 py-3 bg-game-dark rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
                />
              </div>
            </>
          )}
          {/* Save Button */}
          {showChallengeScores && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-game-purple to-game-pink rounded-lg font-gaming text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Team'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;