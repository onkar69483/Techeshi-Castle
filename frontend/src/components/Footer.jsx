import React from 'react';
import { Link } from 'react-router-dom';  // Use react-router-dom for routing in React

const Footer = () => {
  return (
    <footer className="py-8 md:py-12 px-4 bg-[#0A0A1F] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-gaming bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
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
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg sm:rounded-r-none focus:outline-none focus:border-violet-500 text-white w-full"
              />
              <button 
                type="submit"
                className="mt-2 sm:mt-0 px-4 py-2 bg-violet-600 rounded-lg sm:rounded-l-none hover:bg-violet-700 transition-colors w-full sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 md:mt-12 pt-8 border-t border-white/10 text-center text-gray-400 font-space text-sm">
          © {new Date().getFullYear()} Rotonity & ACM. Crafted with precision by{' '}
          <a
            href="https://sachinmhetre.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-gray-100 transition-colors duration-200"
          >
            Sachin Mhetre
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
