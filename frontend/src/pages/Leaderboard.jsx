import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Fetch scores from your backend
    // Example: fetch('your-api-endpoint/scores')
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
                {scores.map((score, index) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events; 