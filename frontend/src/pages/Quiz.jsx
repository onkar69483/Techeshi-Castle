import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ChevronRight, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizType, setQuizType] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [confirmAnswer, setConfirmAnswer] = useState(false);
  const navigate = useNavigate();

  const fetchQuestions = async (type) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://techeshi-castle-backend.vercel.app/game/random?type=${type}`);
      setQuestions(response.data);
      setQuizType(type);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    if (showSolution) return;
    setSelectedAnswer(answer);
    setConfirmAnswer(true);
  };

  const confirmAndSubmitAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].solution) {
      setScore(score + 1);
    }
    setShowSolution(true);
    setConfirmAnswer(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowSolution(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizComplete(false);
    setQuizType(null);
    setQuestions([]);
    setShowSolution(false);
  };

  const handleExitQuiz = () => {
  if (score > 0) {
    localStorage.setItem('quizScore', score.toString());
    navigate('/admin/create-team');
  } else {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      navigate('/admin/create-team');
    }
  }
};


  const getAnswerButtonClass = (option) => {
    if (!showSolution) {
      return selectedAnswer === option
        ? 'bg-fuchsia-500/20 border-fuchsia-500'
        : 'bg-[#0A0A1F] border-violet-400/20 hover:border-fuchsia-500/50';
    }

    if (option === questions[currentQuestion].solution) {
      return 'bg-green-500/20 border-green-500';
    }
    if (selectedAnswer === option && option !== questions[currentQuestion].solution) {
      return 'bg-red-500/20 border-red-500';
    }
    return 'bg-[#0A0A1F] border-violet-400/20';
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-game-dark">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-gaming text-center mb-8 bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text"
          >
            Circuit Challenge Quiz
          </motion.h1>
          <button
            onClick={handleExitQuiz}
            className="px-6 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all duration-300"
          >
            Exit Quiz
          </button>
        </div>

        {!quizType && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchQuestions('gk')}
              className="p-8 bg-gradient-to-r from-game-purple/20 to-game-pink/20 rounded-2xl border border-game-purple/30 hover:border-game-pink/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-gaming text-white mb-4">General Knowledge</h3>
              <p className="text-gray-300 font-space">Test your general electronics knowledge</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchQuestions('coding')}
              className="p-8 bg-gradient-to-r from-game-purple/20 to-game-pink/20 rounded-2xl border border-game-purple/30 hover:border-game-pink/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-gaming text-white mb-4">Coding Challenge</h3>
              <p className="text-gray-300 font-space">Prove your programming expertise</p>
            </motion.button>
          </div>
        )}

        {loading && (
          <div className="text-center text-white font-gaming text-xl">
            Loading questions...
          </div>
        )}

        {questions.length > 0 && !quizComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-game-card p-8 rounded-2xl shadow-xl border border-game-purple/20"
          >
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-game-pink font-gaming">
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <span className="text-game-purple font-gaming">
                  Score: {score}
                </span>
              </div>
              <h2 className="text-xl text-white font-space mb-6">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: showSolution ? 1 : 1.02 }}
                    whileTap={{ scale: showSolution ? 1 : 0.98 }}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showSolution}
                    className={`w-full p-4 rounded-lg font-space text-left transition-all duration-300 ${getAnswerButtonClass(option)} border`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
              {confirmAnswer && !showSolution && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmAndSubmitAnswer}
                  className="w-full py-3 mt-4 rounded-lg font-gaming bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                >
                  Submit Answer
                </motion.button>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextQuestion}
              disabled={!showSolution}
              className={`w-full py-3 rounded-lg font-gaming transition-all duration-300 ${
                showSolution
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ChevronRight className="inline-block ml-2" />
            </motion.button>
          </motion.div>
        )}

        {quizComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Trophy className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl font-gaming text-white mb-4">Quiz Complete!</h2>
            <p className="text-2xl font-space text-gray-300 mb-4">
              Your score: {score}/{questions.length}
            </p>
            <p className="text-xl font-space text-gray-400 mb-8">
              {score === questions.length 
                ? 'Perfect Score! You\'re a champion!' 
                : score > questions.length / 2 
                  ? 'Great job! Keep practicing!' 
                  : 'Keep trying, you can do better!'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestartQuiz}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-gaming text-white"
            >
              Try Another Quiz
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
