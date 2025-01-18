import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const JoinBattleModal = ({ isOpen, onClose }) => {
  const launchCelebration = () => {
    // First burst of confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#D946EF', '#0EA5E9'],
    });

    // Second burst after a delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors: ['#8B5CF6', '#D946EF', '#0EA5E9'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors: ['#8B5CF6', '#D946EF', '#0EA5E9'],
      });
    }, 250);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-lg bg-gradient-to-b from-game-dark/95 to-game-darker/95 p-6 rounded-2xl border border-violet-500/20 shadow-2xl"
          >
            {/* Glowing orbs in background */}
            <div className="absolute -z-10 inset-0 overflow-hidden">
              <div className="absolute top-1/4 -left-4 w-24 h-24 bg-violet-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="absolute bottom-1/4 -right-4 w-24 h-24 bg-fuchsia-600 rounded-full blur-2xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="mx-auto w-16 h-16 bg-violet-600/20 rounded-xl flex items-center justify-center mb-4"
              >
                <Gamepad2 className="w-8 h-8 text-violet-400" />
              </motion.div>
              <h2 className="text-2xl font-gaming mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
                Classroom 404: Battle Zone
              </h2>
              <p className="text-gray-400">The battle awaits, warrior! Ready to join?</p>
            </div>

            {/* Animated Border */}
            <div className="relative p-4 border border-violet-500/20 rounded-xl bg-violet-500/5 mb-6">
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <motion.div
                  animate={{
                    x: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"
                />
              </div>
              <p className="text-center text-sm">
                🎮 Prepare for an epic gaming journey! Join Classroom 404 to test your skills and claim victory in our electronic battleground.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  launchCelebration();
                  // Add your join logic here
                }}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg font-gaming text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/50 transition-shadow relative group overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Enter Battle Zone
                  <Sparkles className="w-4 h-4" />
                </span>
                <motion.div
                  initial={{ x: "100%" }}
                  whileHover={{ x: "-100%" }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600"
                />
              </motion.button>

              <button
                onClick={onClose}
                className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg font-gaming text-gray-300 hover:text-white transition-colors border border-white/10"
              >
                Return to Base
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinBattleModal;