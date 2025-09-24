"use client";
import Prism from "./reactbits/Prism";
import Reveal from "./Reveal";
import { motion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { CarModel } from "./RotatingCarBackground";
import {useEffect, useState } from "react";
    

export default function ProductSlider() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Enhanced scroll tracking for smooth animations
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Animated Prism Background */}
      <div className="absolute inset-0 -z-30">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={4.0}
          baseWidth={5.5}
          scale={3.6}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>

      {/* 3D Car Scene */}
      <div className="absolute inset-0 -z-20">
        <Canvas 
          camera={{ position: [0, 1, 6], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          {/* Enhanced Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.2} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-5, 2, 2]} intensity={0.8} color="#00ffff" />
          <spotLight 
            position={[0, 8, 0]} 
            intensity={0.5} 
            angle={0.3} 
            penumbra={1}
            color="#ffffff"
            target-position={[-2, -1, 2]}
          />
          
          {/* Car Model with Enhanced Animations */}
          <CarModel />

          {/* Disabled controls for cinematic experience */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false} 
          />
        </Canvas>
      </div>

      {/* Animated Overlay Effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at ${30 + scrollProgress * 40}% 70%, 
                        rgba(0, 255, 255, ${0.1 - scrollProgress * 0.05}) 0%, 
                        transparent 50%)`
          }}
        />
      </div>

      {/* Foreground Content with Enhanced Animations */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl">
        <Reveal direction="up" delay={1.2}>
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold 
                       bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-700 
                       bg-clip-text text-transparent"
            animate={{
              backgroundPosition: [`0% 50%`, `100% 50%`, `0% 50%`],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            ToySquad – High-Speed RC Cars
          </motion.h1>
        </Reveal>

        <Reveal direction="up" delay={1.4}>
          <motion.p 
            className="mt-4 text-gray-300 max-w-lg text-lg"
            animate={{
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Race-ready remote control cars with cutting-edge technology. 
            Experience the thrill of high-speed racing.
          </motion.p>
        </Reveal>

        <div className="mt-8 flex gap-4 justify-center">
          <Reveal direction="left" delay={1.6}>
            <motion.button
              whileHover={{ 
                scale: 1.08, 
                boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 
                        px-8 py-4 rounded-2xl font-bold text-lg
                        shadow-lg hover:shadow-cyan-500/25 
                        transition-all duration-300"
              animate={{
                boxShadow: [
                  "0 4px 15px rgba(59, 130, 246, 0.2)",
                  "0 4px 25px rgba(0, 255, 255, 0.3)",
                  "0 4px 15px rgba(59, 130, 246, 0.2)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Shop Now
            </motion.button>
          </Reveal>

          <Reveal direction="right" delay={1.6}>
            <motion.button
              whileHover={{ 
                scale: 1.08,
                backgroundColor: "rgba(59, 130, 246, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-cyan-400 px-8 py-4 font-bold 
                        rounded-2xl text-cyan-400 hover:text-white
                        transition-all duration-300"
            >
              Explore Models
            </motion.button>
          </Reveal>
        </div>

        {/* Scroll Indicator */}
        <Reveal direction="up" delay={2.0}>
          <motion.div 
            className="mt-12 flex flex-col items-center text-cyan-400"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-sm font-medium mb-2">Scroll to interact</div>
            <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-400 to-transparent" />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
