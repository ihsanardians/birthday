"use client";
import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fdf2f8]">
      {/* Ornamen blur pastel yang bergerak lambat */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-pink-300 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, -90, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-300 blur-3xl"
      />

      {/* Partikel putih melayang untuk efek magis */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          className="absolute w-3 h-3 rounded-full bg-white backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{
            top: `${15 + i * 15}%`,
            left: `${10 + (i % 2 === 0 ? i * 10 : i * 20)}%`,
          }}
        />
      ))}
    </div>
  );
}
