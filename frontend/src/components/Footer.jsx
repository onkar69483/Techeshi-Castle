import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">Techeshi's Castle</h2>
            <p className="text-gray-400">
              Where technology meets competitive gaming spirit.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/events" className="text-gray-400 hover:text-white">Events</a></li>
              <li><a href="/leaderboard" className="text-gray-400 hover:text-white">Leaderboard</a></li>
              <li><a href="/admin" className="text-gray-400 hover:text-white">admin</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.instagram.com/rotonity?igsh=MXltOWt3ZzFoYTUx" 
                  className="text-gray-400 hover:text-white"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Rotonity Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/symbiosis.acm/" 
                  className="text-gray-400 hover:text-white"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  SIT ACM Student Chapter
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/techeshi" 
                  className="text-gray-400 hover:text-white"
                >
                  Discord: Techeshi's Castle
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          © {new Date().getFullYear()} {' '}
          <a 
            href="https://www.instagram.com/rotonity?igsh=MXltOWt3ZzFoYTUx" 
            className="font-semibold hover:text-white"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Rotonity
          </a>
          {' '}&{' '}
          <a 
            href="https://www.instagram.com/symbiosis.acm/" 
            className="font-semibold hover:text-white"
            target="_blank" 
            rel="noopener noreferrer"
          >
            ACM
          </a>
          . Crafted with precision by{' '}
          <a 
            href="https://sachinmhetre.vercel.app/" 
            className="font-semibold hover:text-white"
            target="_blank" 
            rel="noopener noreferrer"
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
