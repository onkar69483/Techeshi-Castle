import { useState , useEffect } from "react";
import { motion } from "framer-motion";
import axios from 'axios';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [ loading ,setLoading ] = useState(true);
  const [error , setError] = useState(null);

  const fetchAndFormatTeams = (teams) => {
    return teams
    .map((team)=>({
      team: team.team_name,
      score: team.total_score,
    }))
    .sort((a,b) => b.score - a.score);
  };




  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3001/teams"); 
        const formattedTeams = fetchAndFormatTeams(response.data);
        setScores(formattedTeams);
        setLoading(false);
      } catch{
        setError("Failed to fetch teams data.");
        setLoading(false);
      }
    };

    fetchTeams();

  const interval = setInterval(()=> {
    fetchTeams();
  },2500);

  return () => clearInterval(interval);
} , []);

  if (loading){
    return <div>Loading...</div>;
  }
  if(error){
    return <div>{error}</div>
  }


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