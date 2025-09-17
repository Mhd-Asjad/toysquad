"use client";
import Prism from "./reactbits/Prism";
import Reveal from "./Reveal";
import {motion} from 'motion/react'
import RotatingCarBackground from './RotatingCarBackground'

export default function ProductSlider() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      
      {/* Background 1: Prism */}
      <div className="absolute inset-0 -z-20">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>

      {/* Background 2: Rotating Car */}
      <div className="absolute inset-0 -z-10">
        <RotatingCarBackground />
      </div>

      {/* Foreground Content */}
            <div className="flex flex-col items-center text-center max-w-2xl">
        <Reveal direction="up" delay={0.15}>
          <motion.h1
            style={{ y: -50 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            ToySquad — High-Speed RC Cars
          </motion.h1>
        </Reveal>

        <Reveal direction="up" delay={0.25}>
          <p className="mt-6 text-gray-300">
            Race-ready remote control cars, spare parts and accessories. Shop
            top brands and beginner kits.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.35}>
          <div className="mt-6 flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-300/30 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:bg-blue-300/40"
            >
              Shop Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-700 px-6 py-3 font-bold rounded-2xl"
            >
              Explore Models
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
