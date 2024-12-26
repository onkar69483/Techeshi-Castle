import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Get teams from localStorage and format them for leaderboard
    const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    const formattedTeams = storedTeams
      .map(team => ({
        team: team.name,
        score: team.totalPoints
      }))
      .sort((a, b) => b.score - a.score); // Sort by score in descending order

    setScores(formattedTeams);

    // Update scores every 5 seconds
    const interval = setInterval(() => {
      const updatedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
      const updatedFormattedTeams = updatedTeams
        .map(team => ({
          team: team.name,
          score: team.totalPoints
        }))
        .sort((a, b) => b.score - a.score);
      
      setScores(updatedFormattedTeams);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text">
          Live Leaderboard
        </h2>
        <div className="bg-game-dark/50 rounded-lg border border-game-purple/20">
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
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{score.team}</td>
                      <td className="px-6 py-4">{score.score}</td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 