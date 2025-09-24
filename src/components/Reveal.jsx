"use client";
import { motion } from "framer-motion";

export default function Reveal({
  children,
  direction = "up", // "up" | "down" | "left" | "right"
  delay = 0,
  duration = 0.8,
  className = ""
}) {
  const offset = 40;
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -offset : direction === "right" ? offset : 0,
      y: direction === "up" ? offset : direction === "down" ? -offset : 0
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.25 }}
      variants={variants}
      className={className}
    >

      {children}

    </motion.div>
  );
}
