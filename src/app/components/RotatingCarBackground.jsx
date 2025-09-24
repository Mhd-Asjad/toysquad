"use client";
import Prism from "./reactbits/Prism";
import Reveal from "./Reveal";
import { motion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { a, useSpring } from "@react-spring/three";

// Enhanced Car Model with Dynamic Scroll Animations
export function CarModel(props) {
  const ref = useRef();
  const { scene } = useGLTF("/models/car2.glb");
  const [scrollY, setScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Track scroll with velocity calculation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollVelocity(currentScrollY - lastScrollY);
      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Entry animation with dramatic timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Calculate dynamic scroll-based values
  const scrollProgress = Math.min(scrollY / 1000, 1);
  const velocityFactor = Math.min(Math.abs(scrollVelocity) / 10, 1);

  // Enhanced spring animations with scroll responsiveness
  const { positionX, positionY, positionZ, rotationY, rotationX, rotationZ, scale } = useSpring({
    // Dynamic positioning - car moves forward (right) as user scrolls
    positionX: hasEntered 
      ? -1.5 + scrollProgress * 6 + velocityFactor * 0.5 // Moves right with scroll and velocity (increased movement)
      : -8, // Starts far left
    
    positionY: hasEntered ? -3.5 : -2.5, // Moved car down significantly
    
    positionZ: hasEntered 
      ? 1.8 + scrollProgress * 0.8 + Math.sin(scrollY * 0.005) * 0.3 // Forward movement with scroll
      : 1.5,
    
    // Forward-facing rotation - car faces right direction
    rotationY: hasEntered 
      ? 0.2 - scrollY * 0.001 + velocityFactor * 0.08 // Positive rotation for forward facing
      : -0.5, // Starts rotated during entry
    
    // Dynamic tilt based on scroll velocity (like acceleration)
    rotationX: hasEntered 
      ? Math.sin(scrollY * 0.003) * 0.08 + velocityFactor * 0.03 // Tilts back when accelerating (scrolling down)
      : -0.1,
    
    // Banking/leaning effect
    rotationZ: hasEntered 
      ? scrollVelocity * 0.002 + Math.sin(scrollY * 0.004) * 0.02 // Leans appropriately
      : 0,
    
    // Scale grows with interaction
    scale: hasEntered 
      ? 1.6 + velocityFactor * 0.3 + Math.sin(scrollProgress * Math.PI) * 0.1 // Slightly larger
      : 0.8,
    
    config: hasEntered 
      ? { 
          mass: 1, 
          tension: velocityFactor > 0.5 ? 120 : 80, // More responsive when scrolling fast
          friction: velocityFactor > 0.5 ? 15 : 25 
        }
      : { mass: 2, tension: 40, friction: 30 }, // Smooth entry
  });

  // Frame-based animations for continuous motion
  useFrame((state) => {
    if (ref.current && hasEntered) {
      const time = state.clock.elapsedTime;
      
      // Engine vibration effect (subtle) - adjusted for new Y position
      ref.current.position.y = -3.5 + Math.sin(time * 8) * 0.009 + Math.sin(time * 15) * 0.005;
      
      // Wheel rotation simulation based on movement (forward direction)
      const wheelSpeed = (scrollVelocity + scrollProgress) * 0.15;
      
      // Suspension bounce based on scroll velocity
      const suspensionBounce = Math.sin(time * 6 + velocityFactor * 2) * velocityFactor * 0.03;
      ref.current.position.y += suspensionBounce;
      
      // Slight steering wheel effect (corrected direction)
      const steeringInput = Math.sin(scrollY * 0.008) * 0.03;
      ref.current.rotation.y += steeringInput * 0.05;
      
      // Exhaust/acceleration effect when scrolling fast
      if (velocityFactor > 0.3) {
        const accelerationTilt = Math.sin(time * 4) * velocityFactor * 0.01;
        ref.current.rotation.x += accelerationTilt;
      }
      
      // Headlight flicker effect (very subtle)
      if (scrollProgress > 0.3) {
        const flicker = Math.sin(time * 20) * 0.0008;
        ref.current.rotation.z += flicker;
      }
    }
  });

  return (
    <a.primitive
      ref={ref}
      object={scene}
      scale={scale}
      position-x={positionX}
      position-y={positionY}
      position-z={positionZ}
      rotation-x={rotationX}
      rotation-y={rotationY}
      rotation-z={rotationZ}
      {...props}
    />
  );
}

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Animated Prism Background */}
      <div className="absolute inset-0 -z-30">
        <Prism
          animationType="rotate"
          timeScale={0.5 + scrollProgress * 0.3} // Speed up with scroll
          height={4.0}
          baseWidth={5.5}
          scale={3.2}
          colorFrequency={1 + scrollProgress * 2} // More vibrant with scroll
          noise={scrollProgress * 0.1} // Add noise with scroll
          glow={1 + scrollProgress * 0.5} // Intensify glow
        />
      </div>

      {/* Enhanced 3D Car Scene */}
      <div className="absolute inset-0 -z-20">
        <Canvas 
          camera={{ 
            position: [0 + scrollProgress * 2, 1 + scrollProgress * 0.5, 6 - scrollProgress], 
            fov: 50 + scrollProgress * 10 
          }}
          style={{ background: 'transparent' }}
        >
          {/* Dynamic Lighting Setup */}
          <ambientLight intensity={0.4 + scrollProgress * 0.2} />
          <directionalLight 
            position={[5 - scrollProgress * 2, 5, 5 - scrollProgress]} 
            intensity={1.2 + scrollProgress * 0.3} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            color={`hsl(${180 + scrollProgress * 60}, 70%, 90%)`}
          />
          <pointLight 
            position={[-5 + scrollProgress * 3, 2, 2]} 
            intensity={0.8 + scrollProgress * 0.4} 
            color="#00ffff" 
          />
          <spotLight 
            position={[0, 8, 0]} 
            intensity={0.5 + scrollProgress * 0.3} 
            angle={0.3 + scrollProgress * 0.1} 
            penumbra={1}
            color={`hsl(${200 + scrollProgress * 40}, 80%, 85%)`}
            target-position={[-2 + scrollProgress, -1, 2]}
          />
          
          {/* Enhanced Car Model */}
          <CarModel />

          {/* Disabled controls for cinematic experience */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false} 
          />
        </Canvas>
      </div>

      {/* Dynamic Animated Overlay Effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at ${30 + scrollProgress * 40}% 70%, 
                            rgba(0, 255, 255, ${0.15 - scrollProgress * 0.05}) 0%, 
                            transparent 60%),
              linear-gradient(${45 + scrollProgress * 90}deg, 
                            rgba(59, 130, 246, ${0.1 + scrollProgress * 0.1}) 0%, 
                            transparent 40%)`
          }}
        />
        
        {/* Speed lines effect when scrolling */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{
            opacity: scrollProgress > 0.1 ? scrollProgress * 0.6 : 0,
          }}
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent 0%,
              rgba(0, 255, 255, 0.1) ${2 + scrollProgress * 2}%,
              transparent ${4 + scrollProgress * 4}%
            )`
          }}
        />
      </div>

      {/* Enhanced Foreground Content */}
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
              duration: 8 - scrollProgress * 2, // Speed up with scroll
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%",
              filter: `blur(${Math.max(0, scrollProgress - 0.8) * 2}px)` // Slight blur at high scroll
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
              x: scrollProgress * -20, // Slight parallax
            }}
            transition={{
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 0 }
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
                  `0 4px 25px rgba(0, 255, 255, ${0.3 + scrollProgress * 0.2})`,
                  "0 4px 15px rgba(59, 130, 246, 0.2)"
                ],
                x: scrollProgress * -10, // Parallax effect
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 0 }
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
              animate={{
                x: scrollProgress * 10, // Opposite parallax
                borderColor: `hsl(${180 + scrollProgress * 40}, 70%, 60%)`
              }}
              transition={{
                x: { duration: 0 },
                borderColor: { duration: 0 }
              }}
            >
              Explore Models
            </motion.button>
          </Reveal>
        </div>

        {/* Enhanced Scroll Indicator */}
        <Reveal direction="up" delay={2.0}>
          <motion.div 
            className="mt-12 flex flex-col items-center text-cyan-400"
            animate={{
              y: [0, 10, 0],
              opacity: 1 - scrollProgress * 2, // Fades as user scrolls
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0 }
            }}
          >
            <div className="text-sm font-medium mb-2">
              {scrollProgress > 0.1 ? "Keep scrolling!" : "Scroll to interact"}
            </div>
            <div 
              className="w-0.5 bg-gradient-to-b from-cyan-400 to-transparent"
              style={{ 
                height: `${32 + scrollProgress * 16}px`,
              }}
            />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}