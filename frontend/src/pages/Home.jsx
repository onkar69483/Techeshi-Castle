'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import { ChevronDown, Users, Calendar, Crown, Star, Shield, Trophy } from 'lucide-react';
import DynamicBackground from "../components/DynamicBackground";
import JoinBattleModal from "../components/JoinBattleModal";
import axios from "axios";

const Home = () => {
  const events = [
    {
      title: "Circuit Showdown",
      description: "Test your electronic knowledge in this exciting circuit design challenge! Solve quiz questions to unlock circuit solutions, then bring them to life. Teams will compete to build the most efficient circuits based on quiz solutions.",
      image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e",
      color: "from-violet-600 to-fuchsia-600",
      icon: "⚡"
    },
    {
      title: "Bullseye Battle",
      description: "Take control of a remote-controlled turret in this precision shooting challenge! Use your points from Circuit Showdown to purchase ammunition and demonstrate your accuracy. Can you hit all targets with minimal resources?",
      color: "from-cyan-600 to-blue-600",
      image: "https://images.unsplash.com/photo-1599687267812-35c05ff70ee9",
      icon: "🎯"
    },
    {
      title: "Laser Labyrinth",
      description: "Navigate through an intricate maze of laser beams in this ultimate test of precision and patience. Avoid triggers, beat the clock, and maintain your composure as you traverse through this challenging final level!",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      color: "from-rose-600 to-orange-600",
      icon: "🔮"
    }
  ];

  const [leaderboard, setLeaderboard] = useState([]);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/teams`);
      const formattedTeams = response.data.map((team, index) => ({
        rank: index + 1,
        team: team.team_name,
        score: team.total_score,
        trend: "stable",
        avatar: getTeamAvatar(index)
      })).sort((a, b) => b.score - a.score);

      setLeaderboard(formattedTeams.slice(0, 5));
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
    const interval = setInterval(fetchTeams, 5000);
    return () => clearInterval(interval);
  }, []);

  const getTeamAvatar = (index) => {
    const avatars = ["🥷", "🎯", "👾", "🏴‍☠️", "🐉"];
    return avatars[index % avatars.length];
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up": return "text-emerald-400";
      case "down": return "text-rose-400";
      default: return "text-gray-400";
    }
  };

  const DesktopPodium = () => (
    <div className="relative py-20 hidden md:block">
      <div className="flex justify-center items-end gap-8 h-96">
        {/* Second Place */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative flex flex-col items-center"
        >
          {leaderboard[1] && (
            <>
              <div className="absolute -top-16 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-4xl mb-2">
                  {leaderboard[1].avatar}
                </div>
                <p className="font-gaming text-center max-w-[120px] truncate">{leaderboard[1].team}</p>
                <p className="font-mono text-xl font-bold mt-1">{leaderboard[1].score.toLocaleString()}</p>
              </div>
              <div className="w-32 h-64 bg-gray-500/20 border-t-2 border-gray-400 rounded-t-lg">
                <div className="w-full h-full flex items-end justify-center pb-4">
                  <Star className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* First Place */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex flex-col items-center"
        >
          {leaderboard[0] && (
            <>
              <div className="absolute -top-20 flex flex-col items-center">
                <Crown className="w-10 h-10 text-yellow-500 mb-2" />
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-5xl mb-2">
                  {leaderboard[0].avatar}
                </div>
                <p className="font-gaming text-center max-w-[120px] truncate">{leaderboard[0].team}</p>
                <p className="font-mono text-2xl font-bold mt-1">{leaderboard[0].score.toLocaleString()}</p>
              </div>
              <div className="w-40 h-80 bg-yellow-500/20 border-t-2 border-yellow-400 rounded-t-lg">
                <div className="w-full h-full flex items-end justify-center pb-4">
                  <Trophy className="w-10 h-10 text-yellow-400" />
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Third Place */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative flex flex-col items-center"
        >
          {leaderboard[2] && (
            <>
              <div className="absolute -top-16 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-4xl mb-2">
                  {leaderboard[2].avatar}
                </div>
                <p className="font-gaming text-center max-w-[120px] truncate">{leaderboard[2].team}</p>
                <p className="font-mono text-xl font-bold mt-1">{leaderboard[2].score.toLocaleString()}</p>
              </div>
              <div className="w-32 h-52 bg-orange-500/20 border-t-2 border-orange-400 rounded-t-lg">
                <div className="w-full h-full flex items-end justify-center pb-4">
                  <Shield className="w-8 h-8 text-orange-400" />
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );

  const MobilePodium = () => (
    <div className="md:hidden space-y-4 px-4">
      {leaderboard.slice(0, 3).map((team, index) => (
        <motion.div
          key={team.rank}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between bg-white/5 rounded-lg p-4"
        >
          <div className="flex items-center gap-4">
            {index === 0 && <Crown className="w-6 h-6 text-yellow-400" />}
            {index === 1 && <Star className="w-6 h-6 text-gray-400" />}
            {index === 2 && <Shield className="w-6 h-6 text-orange-400" />}
            <div className="text-3xl">{team.avatar}</div>
            <div>
              <p className="font-gaming">{team.team}</p>
              <p className="font-mono text-sm">{team.score.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A1F] text-white overflow-hidden">
      {/* Hero Section */}
<section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
  {/* Background Layers */}
  <div className="absolute inset-0 w-full h-full">
    <DynamicBackground />
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A1F]/50 via-[#1A1A3F]/50 to-[#0A0A1F]/50 pointer-events-none" />
  </div>

  {/* Content */}
  <div className="relative z-10 text-center max-w-5xl mx-auto">
    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="text-4xl sm:text-6xl md:text-8xl font-gaming font-bold mb-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent animate-gradient"
    >
      Techeshi's Castle
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, type: "spring" }}
      className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 font-space px-4"
    >
      Where Electronics Meet Gaming Excellence
    </motion.p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsJoinModalOpen(true)}
      className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-gaming text-white text-base sm:text-lg shadow-xl hover:shadow-violet-500/50 transition-all duration-300 border border-violet-400/20"
    >
      Join the Battle
    </motion.button>

    {/* Add the modal component */}
    <JoinBattleModal 
      isOpen={isJoinModalOpen} 
      onClose={() => setIsJoinModalOpen(false)} 
    />
  </div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 1 }}
    className="absolute bottom-8 z-10"
  >
    <a href="#featured-events">
      <ChevronDown className="w-8 h-8 sm:w-12 sm:h-12 text-white/50 animate-bounce" />
    </a>
  </motion.div>
</section>

      {/* Events Preview Section */}
      <section id="featured-events" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A1F] to-[#1A1A3F]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-gaming text-center mb-12 sm:mb-16 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text"
        >
          Challenge Levels
        </motion.h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${event.color} opacity-75 z-10`}
              />
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="font-gaming text-white text-xs sm:text-sm lg:text-lg">
                  Level {index + 1}
                </span>
              </div>
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 text-2xl sm:text-4xl">
                {event.icon}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-gaming font-bold mb-2 text-white">
                  {event.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-200 font-space mb-4">
                  {event.description}
                </p>
                <Link
                  to="/events"
                  className="inline-block px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full font-gaming text-sm hover:bg-white hover:text-game-darker transition-colors duration-300 border border-white/20"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-gaming text-center mb-12 sm:mb-16 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text relative z-10"
        >
          Live Leaderboard
        </motion.h2>

        <div className="max-w-4xl mx-auto relative z-10">
          <DesktopPodium />
          <MobilePodium />

          {/* Remaining Rankings */}
          <div className="mt-8 bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 mx-4">
            <AnimatePresence>
              {leaderboard.slice(3).map((team) => (
                <motion.div
                  key={team.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-between p-4 border-b border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{team.avatar}</div>
                    <div>
                      <p className="font-gaming">{team.team}</p>
                      <p className="font-mono text-sm">{team.score.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className={`text-sm ${getTrendColor(team.trend)}`}>
                    {team.trend === "up" && "↑"}
                    {team.trend === "down" && "↓"}
                    {team.trend === "stable" && "→"}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
