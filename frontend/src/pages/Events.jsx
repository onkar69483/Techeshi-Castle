import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, MapPin, Calendar, Users } from "lucide-react";

const EventCard = ({ title, description, image, index, location, time, date, capacity }) => {
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
      className="flex flex-col md:flex-row items-center gap-8 min-h-[60vh] p-8 bg-game-dark/50 rounded-2xl backdrop-blur-sm border border-game-purple/20 hover:border-game-pink/20 transition-all duration-500"
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
          <h3 className="text-4xl font-gaming font-bold mb-4 bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text">
            {title}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="w-5 h-5 text-game-pink" />
              <span className="font-space">{location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="w-5 h-5 text-game-purple" />
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

          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-game-purple to-game-pink rounded-full font-gaming text-white shadow-lg hover:shadow-game-purple/50 transition-all duration-300"
            >
              Register Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border border-game-purple hover:border-game-pink rounded-full font-gaming text-white shadow-lg hover:shadow-game-pink/50 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Events = () => {
  const events = [
    {
      title: "Circuit Showdown",
      description: "Enter the digital arena where electronics meet gaming! Design and debug complex circuits against the clock. Face increasingly challenging levels that test your knowledge of electronic components and circuit design. Will you emerge as the ultimate circuit champion?",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      location: "CL-9 Digital Arena",
      time: "18:00 - 22:00",
      date: "January 15, 2025",
      capacity: "150 Participants"
    },
    {
      title: "Robot Rampage",
      description: "Command your custom-built robot through a series of intense challenges! Navigate obstacle courses, complete tasks, and battle other robots in this high-stakes competition. Combine programming skills with electronic wizardry to claim victory.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      location: "CL-9 Battle Zone",
      time: "14:00 - 20:00",
      date: "January 22, 2025",
      capacity: "100 Teams"
    },
    {
      title: "Tech Titans Arena",
      description: "The ultimate electronics trivia battleground! Compete in real-time against other teams, solving electronic puzzles, identifying components, and answering challenging questions. Quick thinking and deep knowledge are your weapons in this fast-paced showdown.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      location: "CL-9 Main Hall",
      time: "16:00 - 21:00",
      date: "January 29, 2025",
      capacity: "200 Participants"
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
          Epic Events Await
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-center mb-16 text-xl font-space max-w-2xl mx-auto"
        >
          Join us for a series of electrifying events that push the boundaries of technology and innovation
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