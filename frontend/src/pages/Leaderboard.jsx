import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeams = async () => {
    try {
      // Add error handling for missing environment variable
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("Backend URL not configured. Please check your environment variables.");
      }

      // Add proper headers to ensure JSON response
      const response = await axios.get(`${backendUrl}/teams`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Add validation for the response
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      });

      // Add type checking and validation
      if (!response.data) {
        throw new Error("No data received from server");
      }

      // Handle both array and object responses
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
      
      // Provide more specific error messages
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
    // Polling interval for live updates
    const interval = setInterval(fetchTeams, 5000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b border-game-purple/10">
          <div className="flex px-6 py-4">
            <div className="w-1/4 h-4 bg-game-purple/20 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text">
          Live Leaderboard
        </h2>
        
        <div className="bg-game-dark/50 rounded-lg border border-game-purple/20">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-center py-6">
              <p className="text-red-500">{error}</p>
              <button
                onClick={fetchTeams}
                className="mt-4 px-4 py-2 bg-game-purple/20 hover:bg-game-purple/30 rounded-md transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-game-purple/20">
                    <th className="px-6 py-3 text-left">Rank</th>
                    <th className="px-6 py-3 text-left">Team</th>
                    <th className="px-6 py-3 text-left">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-center text-gray-400">
                        No teams available
                      </td>
                    </tr>
                  ) : (
                    scores.map((score, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-game-purple/10"
                      >
                        <td className="px-6 py-4">{score.rank}</td>
                        <td className="px-6 py-4">{score.team}</td>
                        <td className="px-6 py-4">{score.score}</td>
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