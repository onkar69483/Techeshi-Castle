import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Timer, Target, Zap, Users, Calendar, MapPin } from 'lucide-react';
import MysteryQuestImage from '../assets/Mystery_quest3.png';
import TargetStrikeImage from '../assets/Target_Strike1.png'; 
import LazerMaze from '../assets/LazerMaze.png'; 

const EventCard = ({ title, description, rules = [], criteria = [], image, index, location, time, date, capacity }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center gap-8 p-4 sm:p-8 bg-game-dark/50 rounded-2xl backdrop-blur-sm border border-game-purple/20 hover:border-game-pink/20 transition-all duration-500"
    >
      <div className="w-full">
        <div className="relative group">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="rounded-lg shadow-2xl shadow-game-purple/20 group-hover:shadow-game-pink/20 transition-all duration-500 w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover transform group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-game-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </div>
      </div>
      
      <div className="w-full space-y-4 sm:space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-game-purple/20 px-3 py-1 rounded-full">
              <span className="text-game-purple font-gaming text-sm sm:text-base">Level {index + 1}</span>
            </div>
          </div>
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-gaming font-bold mb-4 bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text">
            {title}
          </h3>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-game-pink" />
              <span className="font-space text-xs sm:text-sm">{location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-game-purple" />
              <span className="font-space text-xs sm:text-sm">{time}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-game-pink" />
              <span className="font-space text-xs sm:text-sm">{date}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-game-purple" />
              <span className="font-space text-xs sm:text-sm">{capacity}</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-space mb-4 sm:mb-6">
            {description}
          </p>

          <div className="space-y-4 mb-4 sm:mb-6">
            {rules && rules.length > 0 && (
              <div className="bg-game-purple/10 p-3 sm:p-4 rounded-lg">
                <h4 className="text-game-purple font-gaming mb-2 text-sm sm:text-base">Rules</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1 sm:space-y-2">
                  {rules.map((rule, i) => (
                    <li key={i} className="font-space text-xs sm:text-sm">{rule}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {criteria && criteria.length > 0 && (
              <div className="bg-game-pink/10 p-3 sm:p-4 rounded-lg">
                <h4 className="text-game-pink font-gaming mb-2 text-sm sm:text-base">Judging Criteria</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1 sm:space-y-2">
                  {criteria.map((criterion, i) => (
                    <li key={i} className="font-space text-xs sm:text-sm">{criterion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSeNCnSc5CyJ633J59IrS1UZlC4h7xD9blb5se974Hg8M6utAQ/viewform';
            }}
            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-game-purple to-game-pink rounded-full font-gaming text-white text-sm sm:text-base shadow-lg hover:shadow-game-purple/50 transition-all duration-300"
          >
            Register Now
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Events = () => {
  const events = [
    {
      title: "Laser Maze",
      description: "Traverse through a Laser Maze without triggering the alarm in this ultimate test of precision and patience.",
      image: LazerMaze,
      location: "Symbiosis Institute of Technology, Pune",
      time: "9:00 am",
      date: "24-25 January, 2025",
      capacity: "3-4 members",
      rules: [
        "Participants must traverse through a Laser Maze without triggering the alarm.",
        "Crossing or touching a laser beam will trigger the alarm."
      ],
      criteria: [
        "Points will be awarded based on the time taken to complete the maze.",
        "Penalty points will be deducted for each time the alarm is triggered.",
        "Level 1 score = (Base points for completion) – (Penalties)."
      ]
    },
    {
      title: "Mystery Quest",
      description: "Observe the light sequence carefully and replicate it using the buttons provided. Difficulty increases with each round as sequences get longer and faster.",
      image: MysteryQuestImage,
      location: "Symbiosis Institute of Technology, Pune",
      time: "9:00 am",
      date: "24-25 January, 2025",
      capacity: "3-4 members",
      rules: [
        "Participants must observe the light sequence carefully.",
        "Once the sequence is complete, they must replicate it using the buttons provided.",
        "Difficulty increases with each round as sequences get longer and faster.",
        "Any mistake will end the attempt for that sequence."
      ],
      criteria: [
        "Points will be awarded based on the number of correct sequences completed.",
        "Bonus points may be given for completing higher-difficulty rounds.",
        "Scores will be added to the cumulative total across all levels."
      ]
    },
    {
      title: "Target Strike",
      description: "Take aim with a Nerf gun and strike the targets within the time limit to rack up points and climb the leaderboard.",
      image: TargetStrikeImage,
      location: "Symbiosis Institute of Technology, Pune",
      time: "9:00 am",
      date: "24-25 January, 2025",
      capacity: "3-4 members",
      rules: [
        "Participants will be given a Nerf gun with a fixed number of darts.",
        "They must shoot at the designated targets within the time limit.",
        "Only darts that directly hit the targets will be counted as valid.",
        "Tampering with targets or equipment will result in disqualification."
      ],
      criteria: [
        "Points will be awarded for each target successfully hit.",
        "Extra points may be given for hitting special marked targets (if included).",
        "Scores will be combined with other levels to determine the final leaderboard."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-game-dark pt-16 sm:pt-24 pb-16 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-gaming font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text"
        >
          Techeshi's Castle
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-center mb-12 sm:mb-16 text-sm sm:text-base md:text-xl font-space max-w-2xl mx-auto"
        >
          Test your skills in three challenging levels of electronic mastery and precision
        </motion.p>
        <div className="space-y-16 sm:space-y-24 md:space-y-32">
          {events.map((event, index) => (
            <EventCard key={index} {...event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;