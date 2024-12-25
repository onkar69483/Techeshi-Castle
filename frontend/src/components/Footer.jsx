import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-[#0A0A1F] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-gaming bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
              Techeshi's Castle
            </h3>
            <p className="text-gray-400 font-space text-sm">
              Where technology meets competitive gaming spirit.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-gaming text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 font-space">
              <li><Link to="/events" className="hover:text-violet-400 transition-colors">Events</Link></li>
              <li><Link to="/leaderboard" className="hover:text-violet-400 transition-colors">Leaderboard</Link></li>
              <li><Link to="/schedule" className="hover:text-violet-400 transition-colors">Schedule</Link></li>
              <li><Link to="/register" className="hover:text-violet-400 transition-colors">Register</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-gaming text-white">Contact</h4>
            <ul className="space-y-2 text-gray-400 font-space">
              <li>Email: info@techeshi.com</li>
              <li>Discord: Techeshi's Castle</li>
              <li>Twitter: @TecheshiCastle</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-gaming text-white">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-l-lg focus:outline-none focus:border-violet-500 text-white"
              />
              <button className="px-4 py-2 bg-violet-600 rounded-r-lg hover:bg-violet-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 font-space text-sm">
        © {new Date().getFullYear()} Sachin Mhetre. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 