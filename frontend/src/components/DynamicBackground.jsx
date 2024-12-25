import React, { useState, useEffect } from 'react';

const backgrounds = [
  // Simple grid
  {
    background: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 4px, transparent 4px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 4px, transparent 4px)`,
    backgroundSize: '150px 150px'
  }, 
  // Hexagonal Pattern
  {
    background: `
      repeating-linear-gradient(
        60deg,
        rgba(255, 255, 255, 0.1) 0,
        rgba(255, 255, 255, 0.1) 2px,
        transparent 2px,
        transparent 22px
      ),
      repeating-linear-gradient(
        120deg,
        rgba(255, 255, 255, 0.1) 0,
        rgba(255, 255, 255, 0.1) 2px,
        transparent 2px,
        transparent 22px
      ),
      repeating-linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.1) 0,
        rgba(255, 255, 255, 0.1) 2px,
        transparent 2px,
        transparent 22px
      )
    `,
    backgroundSize: '38px 66px',
  },
  // Dots Pattern
  {
    background: `
      radial-gradient(circle, rgba(255, 255, 255, 0.3) 2px, transparent 2px),
      radial-gradient(circle, rgba(255, 255, 255, 0.3) 2px, transparent 2px)
    `,
    backgroundSize: '40px 40px',
    backgroundPosition: '0 0, 20px 20px',
  },
];

const DynamicBackground = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000); // Change background every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute inset-0"
      style={{
        ...backgrounds[currentIndex],
        transition: 'background 1s ease',
      }}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default DynamicBackground;
