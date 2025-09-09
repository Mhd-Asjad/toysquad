'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star,
  Heart,
  ShoppingCart,
  Play,
  Sparkles,
  Gift,
  Users,
  Zap
} from 'lucide-react';
import { slides } from '../data';
import Image from 'next/image';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);


  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 pt-20 lg:pt-28">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Shapes */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            delay: 0
          }}
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -10, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            delay: 1
          }}
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-15"
        />
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            delay: 2
          }}
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10"
        />
      </div>

      {/* Main Slider Container */}
      <div className="relative z-10 min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-7rem)] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Slide Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
            >
              
              {/* Left Content */}
              <div className="space-y-8 text-center lg:text-left">
                
                {/* Discount Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center space-x-2"
                >
                  <div className={`bg-gradient-to-r ${currentSlideData.buttonColor} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>{currentSlideData.discount}</span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  </motion.div>
                </motion.div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                  >
                    <span className={`bg-gradient-to-r ${currentSlideData.bgGradient} bg-clip-text text-transparent`}>
                      {currentSlideData.title}
                    </span>
                  </motion.h1>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${currentSlideData.accentColor}`}
                  >
                    {currentSlideData.subtitle}
                  </motion.h2>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0"
                >
                  {currentSlideData.description}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-3"
                >
                  {currentSlideData.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                      className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-md"
                    >
                      ✨ {feature}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Call to Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r ${currentSlideData.buttonColor} text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{currentSlideData.cta}</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/80 backdrop-blur-sm text-gray-700 font-semibold py-4 px-8 rounded-2xl border-2 border-white/50 hover:bg-white hover:border-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Users className="w-5 h-5" />
                    <span>View Collection</span>
                  </motion.button>
                </motion.div>

              </div>

              {/* Right Content - Visual Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 1, type: "spring" }}
                className="relative flex items-center justify-center"
              >
                <div className="relative">
                  {/* Main Visual Circle */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-r ${currentSlideData.bgGradient} rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden`}
                  >
                    {/* Inner Pattern */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="w-60 h-60 lg:w-72 lg:h-72 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <span className="text-8xl lg:text-9xl filter drop-shadow-lg">
                        <Image
                        src={currentSlideData.image}
                        height={300}
                        width={300}
                        
                        alt='product image'
                        />
                      </span>
                    </motion.div>
                    
                    {/* Floating Icons */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 8 + i,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                        className="absolute"
                        style={{
                          top: `${20 + Math.sin(i * 0.8) * 30}%`,
                          left: `${20 + Math.cos(i * 0.8) * 30}%`
                        }}
                      >
                        <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                          {i % 4 === 0 && <Star className="w-4 h-4 text-yellow-300" />}
                          {i % 4 === 1 && <Heart className="w-4 h-4 text-pink-300" />}
                          {i % 4 === 2 && <Sparkles className="w-4 h-4 text-blue-300" />}
                          {i % 4 === 3 && <Gift className="w-4 h-4 text-purple-300" />}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Orbiting Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center"
                      >
                        <Star className="w-5 h-5 text-yellow-800" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-6">
          
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </motion.button>

          {/* Slide Indicators */}
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? `bg-gradient-to-r ${slides[index].bgGradient}` 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </motion.button>

          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlayPause}
            className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
              isPlaying 
                ? 'bg-orange-500 text-white hover:bg-orange-600' 
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <Play className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
          </motion.button>

        </div>
      </div>

      {/* Progress Bar */}
      <motion.div
        key={currentSlide}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 5, ease: "linear" }}
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${currentSlideData.bgGradient} origin-left`}
        style={{ width: '100%' }}
      />

    </section>
  );
};

export default HeroSection;