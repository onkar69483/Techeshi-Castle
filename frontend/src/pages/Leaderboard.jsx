import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Trophy, Medal, Award } from "lucide-react";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeams = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("Backend URL not configured. Please check your environment variables.");
      }

      const response = await axios.get(`${backendUrl}/teams`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      });

      if (!response.data) {
        throw new Error("No data received from server");
      }

      const teamsData = Array.isArray(response.data) ? response.data : 
                       (response.data.teams ? response.data.teams : null);

      if (!teamsData) {
        throw new Error("Invalid data format received from server");
      }

      const formattedTeams = teamsData
        .map((team, index) => ({
          rank: index + 1,
          team: team.team_name || 'Unknown Team',
          score: typeof team.total_score === 'number' ? team.total_score : 0,
        }))
        .sort((a, b) => b.score - a.score);

      setScores(formattedTeams);
      setError(null);
    } catch (err) {
      console.error("Error fetching teams:", err);
      
      if (err.response?.status === 404) {
        setError("API endpoint not found. Please check the server configuration.");
      } else if (err.response?.status === 500) {
        setError("Server error occurred. Please try again later.");
      } else if (err.message === "Network Error") {
        setError("Unable to connect to the server. Please check your internet connection.");
      } else {
        setError(err.message || "Failed to load leaderboard. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
    const interval = setInterval(fetchTeams, 5000);
    return () => clearInterval(interval);
  }, []);

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b border-game-purple/10">
          <div className="flex px-6 py-6">
            <div className="w-1/4 h-6 bg-game-purple/20 rounded"></div>
            <div className="w-1/2 h-6 bg-game-purple/10 rounded ml-4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-game-dark to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-game-purple via-game-pink to-game-purple bg-size-200 animate-gradient-x text-transparent bg-clip-text"
        >
          Live Leaderboard
        </motion.h2>
        
        <div className="bg-game-dark/80 backdrop-blur-lg rounded-xl border border-game-purple/30 shadow-2xl shadow-game-purple/10">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
              <button
                onClick={fetchTeams}
                className="mt-6 px-6 py-3 bg-game-purple/20 hover:bg-game-purple/30 rounded-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-game-purple/50 outline-none"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-game-purple/20">
                    <th className="px-6 py-4 text-left text-game-purple">Rank</th>
                    <th className="px-6 py-4 text-left text-game-purple">Team</th>
                    <th className="px-6 py-4 text-left text-game-purple">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-gray-400">
                        No teams available
                      </td>
                    </tr>
                  ) : (
                    scores.map((score, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-b border-game-purple/10 hover:bg-game-purple/5 transition-colors ${
                          score.rank <= 3 ? 'bg-game-purple/10' : ''
                        }`}
                      >
                        <td className="px-6 py-6 flex items-center gap-3">
                          {getRankIcon(score.rank)}
                          <span className={`font-semibold ${score.rank <= 3 ? 'text-game-pink' : ''}`}>
                            #{score.rank}
                          </span>
                        </td>
                        <td className="px-6 py-6 font-medium">{score.team}</td>
                        <td className="px-6 py-6">
                          <span className="bg-game-purple/20 px-4 py-1 rounded-full">
                            {score.score.toLocaleString()}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;