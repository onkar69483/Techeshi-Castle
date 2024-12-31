import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-game-dark/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo}
              alt="Logo" 
              className="h-20" 
            />
            <span className="relative text-lg font-gaming font-bold">
              <span className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 text-transparent bg-clip-text animate-shine">
                Techeshi's Castle
              </span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-gray-100 via-gray-400 to-gray-600">
                Techeshi's Castle
              </span>
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-white hover:text-game-purple transition-colors font-gaming">
                Home
              </Link>
              <Link to="/events" className="text-white hover:text-game-purple transition-colors font-gaming">
                Events
              </Link>
              <Link to="/leaderboard" className="text-white hover:text-game-purple transition-colors font-gaming">
                Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
