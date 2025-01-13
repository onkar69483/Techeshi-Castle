import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ChevronRight, Brain, Code, Trophy, Check, Zap } from 'lucide-react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizType, setQuizType] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [circuit, setCircuit] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showCurrentStep, setShowCurrentStep] = useState(false);

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
    setIsAnswerSubmitted(false);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    setShowSolution(true);
    
    const isCorrect = selectedAnswer === questions[currentQuestion].solution;
    if (isCorrect) {
      setScore(score + 1);
      setShowCurrentStep(true);
      if(currentStepIndex == circuit.circuit_step.length - 1){
        setQuizComplete(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowSolution(false);
      setIsAnswerSubmitted(false);
      setShowCurrentStep(false);
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
    setIsAnswerSubmitted(false);
    setCurrentStepIndex(0);
    setShowCurrentStep(false);
  };

  const handleCircuitSelect = async (circuitNumber) => {
    try {
      const response = await axios.get(`https://techeshi-castle-backend.vercel.app/circuit?circuit_number=${circuitNumber}`);
      setCircuit(response.data);
    } catch (error) {
      console.error('Error fetching circuit:', error);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < circuit.circuit_step.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      handleNextQuestion();
    } else {
      setQuizComplete(true);
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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-gaming text-center mb-8 bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text"
        >
          Circuit Challenge Quiz
        </motion.h1>

        {!circuit && (
          <div className="text-center">
            <h2 className="text-2xl text-white font-space mb-6">Select a Circuit</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((circuitNumber) => (
                <motion.button
                  key={circuitNumber}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCircuitSelect(circuitNumber)}
                  className="p-4 bg-gradient-to-r from-game-purple/20 to-game-pink/20 rounded-xl border border-game-purple/30 hover:border-game-pink/50 transition-all duration-300"
                >
                  Circuit {circuitNumber}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {circuit && !quizType && !loading && (
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
            </div>
            
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: selectedAnswer && !isAnswerSubmitted ? 1.05 : 1 }}
                whileTap={{ scale: selectedAnswer && !isAnswerSubmitted ? 0.95 : 1 }}
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer || isAnswerSubmitted}
                className={`w-full py-3 rounded-lg font-gaming transition-all duration-300 ${
                  selectedAnswer && !isAnswerSubmitted
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isAnswerSubmitted ? (
                  <span className="flex items-center justify-center">
                    Submitted <Check className="ml-2 w-5 h-5" />
                  </span>
                ) : (
                  'Submit Answer'
                )}
              </motion.button>

              {showCurrentStep && showSolution && selectedAnswer === questions[currentQuestion].solution && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 bg-game-card rounded-xl border border-game-purple/20"
                >
                  <div className="flex items-center mb-4">
                    <Zap className="w-6 h-6 text-yellow-400 mr-2" />
                    <h3 className="text-xl font-gaming text-white">Circuit Step {currentStepIndex + 1}</h3>
                  </div>
                  <p className="text-gray-300 font-space text-lg mb-6">
                    {circuit.circuit_step[currentStepIndex]}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                    className="w-full py-3 rounded-lg font-gaming bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                  >
                    Next Question
                    <ChevronRight className="inline-block ml-2" />
                  </motion.button>
                </motion.div>
              )}

              {showSolution && selectedAnswer !== questions[currentQuestion].solution && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextQuestion}
                  className="w-full py-3 rounded-lg font-gaming bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                >
                  Next Question
                  <ChevronRight className="inline-block ml-2" />
                </motion.button>
              )}
            </div>
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