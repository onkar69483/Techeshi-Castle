import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full z-50 bg-game-dark/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo}
              alt="Logo" 
              className="h-12 sm:h-16 md:h-20" 
            />
            <span className="relative text-sm sm:text-base md:text-lg font-gaming font-bold">
              <span className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 text-transparent bg-clip-text animate-shine">
                Techeshi's Castle
              </span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-gray-100 via-gray-400 to-gray-600">
                Techeshi's Castle
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-game-dark/95 backdrop-blur-sm">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-gaming text-white hover:text-game-purple hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/events"
            className="block px-3 py-2 rounded-md text-base font-gaming text-white hover:text-game-purple hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Events
          </Link>
          <Link
            to="/leaderboard"
            className="block px-3 py-2 rounded-md text-base font-gaming text-white hover:text-game-purple hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;