import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Timer, Target, Zap, Users, Calendar, MapPin } from "lucide-react";

const EventCard = ({ title, description, rules = [], criteria = [], image, index, location, time, date, capacity }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const variants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col md:flex-row items-center gap-8 min-h-[70vh] p-8 bg-game-dark/50 rounded-2xl backdrop-blur-sm border border-game-purple/20 hover:border-game-pink/20 transition-all duration-500"
    >
      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
        <div className="relative group">
          <img
            src={image}
            alt={title}
            className="rounded-lg shadow-2xl shadow-game-purple/20 group-hover:shadow-game-pink/20 transition-all duration-500 w-full h-[400px] object-cover transform group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-game-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </div>
      </div>
      
      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} space-y-6`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-game-purple/20 px-3 py-1 rounded-full">
              <span className="text-game-purple font-gaming">Level {index + 1}</span>
            </div>
          </div>
          
          <h3 className="text-4xl font-gaming font-bold mb-4 bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text">
            {title}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="w-5 h-5 text-game-pink" />
              <span className="font-space">{location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Timer className="w-5 h-5 text-game-purple" />
              <span className="font-space">{time}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Calendar className="w-5 h-5 text-game-pink" />
              <span className="font-space">{date}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Users className="w-5 h-5 text-game-purple" />
              <span className="font-space">{capacity}</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed font-space mb-6">
            {description}
          </p>

          <div className="space-y-4 mb-6">
            {rules && rules.length > 0 && (
              <div className="bg-game-purple/10 p-4 rounded-lg">
                <h4 className="text-game-purple font-gaming mb-2">Rules</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {rules.map((rule, i) => (
                    <li key={i} className="font-space">{rule}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {criteria && criteria.length > 0 && (
              <div className="bg-game-pink/10 p-4 rounded-lg">
                <h4 className="text-game-pink font-gaming mb-2">Judging Criteria</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {criteria.map((criterion, i) => (
                    <li key={i} className="font-space">{criterion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-game-purple to-game-pink rounded-full font-gaming text-white shadow-lg hover:shadow-game-purple/50 transition-all duration-300"
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
      title: "Circuit Showdown",
      description: "Test your electronic knowledge in this exciting circuit design challenge! Solve quiz questions to unlock circuit solutions, then bring them to life in TinkerCad.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      location: "Digital Lab",
      time: "2 Hours",
      date: "January 15, 2025",
      capacity: "Teams of 3-4",
      rules: [
        "Open to all enrolled college students",
        "Teams of 3-4 members",
        "Complete quiz to unlock circuit solutions",
        "Build circuits in TinkerCad based on solutions"
      ],
      criteria: [
        "Circuit functionality evaluation",
        "Number of questions needed for completion",
        "Time taken as tiebreaker"
      ]
    },
    {
      title: "Bullseye Battle",
      description: "Take control of a remote-controlled turret in this precision shooting challenge. Use your points wisely to purchase ammunition and demonstrate your accuracy!",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      location: "Battle Arena",
      time: "1.5 Hours",
      date: "January 15, 2025",
      capacity: "Individual",
      rules: [
        "Use remote-controlled turret",
        "Purchase bullets with points from Level 1",
        "Knock down all targets within time limit"
      ],
      criteria: [
        "Number of bullets required for completion",
        "Efficiency of point usage",
        "Time taken to clear all targets"
      ]
    },
    {
      title: "Laser Labyrinth",
      description: "Navigate through an intricate maze of laser beams in this ultimate test of precision and patience. Can you make it through without triggering the alarm?",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      location: "Main Arena",
      time: "1 Hour",
      date: "January 15, 2025",
      capacity: "Individual",
      rules: [
        "Navigate through laser maze",
        "Avoid triggering alarms",
        "Complete course within time limit"
      ],
      criteria: [
        "Time taken to complete maze",
        "Number of alarms triggered",
        "Combined points from all levels determine winners",
        "Real-time leaderboard updates on website"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-game-dark pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-gaming font-bold text-center mb-6 bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text"
        >
          Circuit Showdown Championship
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-center mb-16 text-xl font-space max-w-2xl mx-auto"
        >
          Test your skills in three challenging levels of electronic mastery and precision
        </motion.p>
        <div className="space-y-32">
          {events.map((event, index) => (
            <EventCard key={index} {...event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;