'use client'

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import { ChevronDown, Users, Calendar, Crown, Star, Shield } from 'lucide-react';
import DynamicBackground from "../components/DynamicBackground";

const Home = () => {
  const events = [
    {
      title: "Circuit Showdown",
      description: "Battle against time in this electronic puzzle challenge!",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      color: "from-violet-600 to-fuchsia-600",
      icon: "🎮"
    },
    {
      title: "Robot Rampage",
      description: "Command your robot through epic challenges!",
      color: "from-cyan-600 to-blue-600",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      icon: "🤖"
    },
    {
      title: "Tech Titans Arena",
      description: "Prove your worth in the ultimate electronics showdown!",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      color: "from-rose-600 to-orange-600",
      icon: "⚡"
    }
  ];

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Get teams from localStorage and format them for leaderboard
    const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    const formattedTeams = storedTeams.map((team, index) => ({
      rank: index + 1,
      team: team.name,
      score: team.totalPoints,
      trend: "stable",
      avatar: getTeamAvatar(index) // Helper function to assign avatars
    })).sort((a, b) => b.score - a.score);

    setLeaderboard(formattedTeams);
  }, []);

  // Helper function to assign avatars
  const getTeamAvatar = (index) => {
    const avatars = ["🥷", "🎯", "👾", "🏴‍☠️", "🐉"];
    return avatars[index % avatars.length];
  };

  // Update scores periodically (optional - you can remove this if you want to show only real scores)
  useEffect(() => {
    const interval = setInterval(() => {
      const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
      const formattedTeams = storedTeams.map((team, index) => ({
        rank: index + 1,
        team: team.name,
        score: team.totalPoints,
        trend: "stable",
        avatar: getTeamAvatar(index)
      })).sort((a, b) => b.score - a.score);

      setLeaderboard(formattedTeams);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up": return "text-emerald-400";
      case "down": return "text-rose-400";
      default: return "text-gray-400";
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-8 h-8 text-yellow-400" />;
      case 2: return <Star className="w-8 h-8 text-gray-400" />;
      case 3: return <Shield className="w-8 h-8 text-orange-400" />;
      default: return <div className="w-8 h-8 rounded-full bg-game-purple/20 flex items-center justify-center">{rank}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A1F] text-white overflow-hidden">
      {/* Hero Section with enhanced gradient */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <DynamicBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A1F] via-[#1A1A3F] to-[#0A0A1F] opacity-90" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="w-full h-full bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-6xl md:text-8xl font-gaming font-bold mb-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent animate-gradient"
          >
            Techeshi's Castle
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-space"
          >
            Where Electronics Meet Gaming Excellence
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-gaming text-white text-lg shadow-xl hover:shadow-violet-500/50 transition-all duration-300 border border-violet-400/20"
          >
            Join the Battle
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8"
        >
          <a href="#featured-events">
            <ChevronDown className="w-12 h-12 text-white/50 animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* Enhanced Events Preview Section */}
      <section id="featured-events" className="py-20 px-4 bg-gradient-to-b from-[#0A0A1F] to-[#1A1A3F]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-gaming text-center mb-16 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text"
        >
          Featured Events
        </motion.h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${event.color} opacity-75 z-10`} />
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 z-20 text-4xl">
                {event.icon}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-gaming font-bold mb-2 text-white">
                  {event.title}
                </h3>
                <p className="text-gray-200 font-space mb-4">
                  {event.description}
                </p>
                <Link
                  to="/events"
                  className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full font-gaming text-sm hover:bg-white hover:text-game-darker transition-colors duration-300 border border-white/20"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Leaderboard Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#1A1A3F] to-[#0A0A1F]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-gaming text-center mb-16 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text"
        >
          Live Leaderboard
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 blur-3xl" />
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="grid grid-cols-3 gap-4 p-6">
                {leaderboard.slice(0, 3).map((team, index) => (
                  <motion.div
                    key={team.rank}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex flex-col items-center justify-end p-6 rounded-xl backdrop-blur-lg ${index === 0 ? 'bg-yellow-500/20 border-yellow-500/50' :
                      index === 1 ? 'bg-gray-500/20 border-gray-500/50' :
                        'bg-orange-600/20 border-orange-500/50'
                      } border`}
                    style={{ height: `${200 + (3 - index) * 50}px` }}
                  >
                    <div className="text-4xl mb-4">{team.avatar}</div>
                    <p className="font-gaming text-xl mb-2 text-center">{team.team}</p>
                    <p className="font-space text-2xl font-bold">{team.score.toLocaleString()}</p>
                    <div className={`mt-4 rounded-full px-4 py-1 text-sm font-bold ${index === 0 ? 'bg-yellow-500/20 text-yellow-300' :
                      index === 1 ? 'bg-gray-500/20 text-gray-300' :
                        'bg-orange-500/20 text-orange-300'
                      }`}>
                      #{team.rank}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-black/40 p-4">
                <AnimatePresence>
                  {leaderboard.slice(3).map((team) => (
                    <motion.div
                      key={team.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0"
                    >
                      <div className="flex items-center gap-4">
                        {getRankIcon(team.rank)}
                        <div className="text-2xl">{team.avatar}</div>
                        <p className="font-gaming text-lg">{team.team}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className={`font-space text-xl font-bold ${getTrendColor(team.trend)}`}>
                          {/* {team.score.toLocaleString()} */}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-[#0A0A1F]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-gaming mb-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text"
          >
            Ready to Join the Challenge?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 font-space"
          >
            Register now and compete in SIT's most exciting tech gaming event!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-gaming text-white text-lg shadow-xl hover:shadow-violet-500/50 transition-all duration-300 border-violet-400/20 flex items-center"
            >
              <Users className="mr-2" /> Register Team
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-gaming text-lg shadow-xl hover:shadow-white/20 transition-all duration-300 border border-white/20 flex items-center"
            >
              <Calendar className="mr-2" /> View Schedule
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;