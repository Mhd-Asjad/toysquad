"use client"
import React from "react";
import { motion } from "motion/react";
import { CircleCheckBigIcon } from "lucide-react";
import { Montserrat as MontserratFont } from "next/font/google";
import Image from "next/image";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});



function AboutPage() {

    const keyAdvantages = [
        "Make every child's playtime magical✨",
        "Support parents with trusted, durable toys💖",
        "Build a squad of happy little dreamers🚀"
    ];

    // Parent variants
        const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
            duration: 0.6,
            staggerChildren: 0.2, // delay between each child
            },
        },
        };

        // Child variants
        const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      
      <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side Heading */}
          <motion.h1
            className="text-5xl lg:text-6xl font-extrabold text-gray-900"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.h1>

          {/* Right Side Paragraph */}
          <motion.p
            className="text-gray-600 text-xl leading-relaxed"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ToySquad is a space where play meets purpose. We believe play is more
            than just fun – it’s the foundation of learning, imagination, and happy
            childhood memories. 🌟
            <br />
            <br />
            Our mission is to provide safe, high-quality, and creative toys that
            inspire curiosity, spark creativity, and encourage learning through
            play. From educational puzzles to cuddly plush toys, every product is
            handpicked to delight kids and reassure parents.
          </motion.p>
        </div>

        {/* Image + Floating Shape */}
        <div className="relative mt-16">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            animate={{ y: [0, -20, 0] }} // Floating animation
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-40 h-40 lg:w-60 lg:h-60 rounded-full blur-sm shadow-2xl" />
          </motion.div>

          <motion.img
            src="/kidplaying.jpg" // replace with your actual image path
            alt="Kids Playing"
            className="w-full h-80 lg:h-[500px] object-cover rounded-2xl shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </section>


      {/* Why Choose Us Section */}
        <motion.div
        className="mt-10 sm:mt-12 max-w-5xl w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants} // Parent container uses variants
        >
        <motion.div
            className="flex-1 backdrop-blur-sm rounded-2xl p-6 sm:p-8"
        >
            <motion.h2 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl md:text-4xl text-center font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">
            Why Choose ToySquad?
            </motion.h2>

            <div className="max-w-3xl mx-auto flex justify-center">
              <motion.ul className="space-y-4">
                  {keyAdvantages.map((advantage, idx) => (
                  <motion.li
                      key={idx}
                      className="flex items-start gap-3 text-left text-gray-700 leading-relaxed"
                      variants={itemVariants} 
                  >
                      <CircleCheckBigIcon
                      className="text-blue-400 flex-shrink-0 mt-1"
                      size={20}
                      />
                      <span>{advantage}</span>
                  </motion.li>
                  ))}
              </motion.ul>
            </div>
        </motion.div>

      </motion.div>



      
    <motion.div
        className="mt-10 sm:mt-12 max-w-4xl w-full 
        rounded-2xl p-6 sm:p-8 
        mx-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.0 }}
        >
        <p
          className={`text-center text-gray-700 text-lg sm:text-xl lg:text-2xl font-semibold leading-relaxed ${montserrat.className}`}
        >
          &quot; At ToySquad, we&apos;re not just selling toys – we&apos;re shaping smiles,
          nurturing imagination, and creating joyful moments that last a lifetime. &quot; 💫
        </p>

    </motion.div>   
    </div>
  );
}

export default AboutPage;