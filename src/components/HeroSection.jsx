"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ShoppingCart, Users } from "lucide-react";
import { slides } from "../data";
import Image from "next/image";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 10000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-gradient pt-20 lg:pt-28 text-[#2a2f6d]">
      <div className="relative z-10 min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-7rem)] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}

                    className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {currentSlideData.title}
                  </motion.h1>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-400"
                  >
                    {currentSlideData.subtitle}
                  </motion.h2>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-lg text-blue-400 max-w-lg mx-auto lg:mx-0"
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

                      transition={{
                        delay: 0.7 + index * 0.1,
                        type: "spring",
                      }}

                      className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#2a2f6d] shadow"
                    >
                      ✨ {feature}
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{currentSlideData.cta}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/80 backdrop-blur-sm text-[#2a2f6d] font-semibold py-4 px-8 rounded-2xl border border-white/60 hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Users className="w-5 h-5" />
                    <span>View Collection</span>
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Content - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 1, type: "spring" }}
                className="relative flex items-center justify-center"
              >
                <div className="relative">
                  {/* Spinning Background */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl relative"
                  ></motion.div>

                  {/* Image stays still */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-60 h-60 lg:w-72 lg:h-72 bg-white/20 rounded-full flex items-center justify-center">
                      <Image
                        src={currentSlideData.image}
                        height={300}
                        width={300}
                        alt="product image"
                        className="drop-shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition"
          >
            <ChevronLeft className="w-6 h-6 text-[#2a2f6d]" />
          </motion.button>

          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition"
          >
            <ChevronRight className="w-6 h-6 text-[#2a2f6d]" />
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div
        key={currentSlide}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}

        transition={{ duration: 10, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 origin-left"
        style={{ width: "100%" }}
      />
    </section>
  );
};

export default HeroSection;