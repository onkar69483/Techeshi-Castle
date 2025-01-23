import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const RedirectModal = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeNCnSc5CyJ633J59IrS1UZlC4h7xD9blb5se974Hg8M6utAQ/viewform";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
    setCountdown(10);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative bg-gradient-to-r from-violet-900/90 to-fuchsia-900/90 p-6 rounded-2xl shadow-2xl border border-white/20 max-w-md w-full backdrop-blur-xl"
      >
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-violet-600/20 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-12 h-12 border-t-2 border-r-2 border-white rounded-full" />
            </motion.div>
          </div>
          <h3 className="text-2xl font-gaming mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Preparing Your Journey
          </h3>
          <p className="text-gray-300 mb-4 font-space">
            Redirecting to registration form. Please select "Techeshi's Castle" in the registration form.
          </p>
          <p className="text-lg font-mono text-violet-300">
            Redirecting in {countdown} seconds...
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const JoinBattleModal = ({ isOpen, onClose }) => {

  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
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

  const handleEnterBattleZone = () => {
    launchCelebration();
    onClose(); 
    // Show redirect modal after confetti
    setTimeout(() => {
      setIsRedirectModalOpen(true);
    }, 500);
  };

  return (
    <><AnimatePresence>
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
              onClick={handleEnterBattleZone}
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
  <RedirectModal 
        isOpen={isRedirectModalOpen}
        onClose={() => setIsRedirectModalOpen(false)}
      />
  </>
  );
};

export default JoinBattleModal;