"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CandleSection({ onBlown }: { onBlown: () => void }) {
  const [isBlown, setIsBlown] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const startMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const AudioContextClass =
          window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

        const checkBlow = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;
          if (volume > 30) {
            setIsBlown(true);
          } else {
            animationFrameRef.current = requestAnimationFrame(checkBlow);
          }
        };
        checkBlow();
      } catch (err) {
        console.error("Gagal akses mic:", err);
      }
    };
    startMic();
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (isBlown) {
      const timer = setTimeout(() => onBlown(), 4000); // Sedikit lebih lama agar bisa lihat bintang
      return () => clearTimeout(timer);
    }
  }, [isBlown, onBlown]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* --- EFEK BINTANG BERKILAU (Muncul setelah api mati) --- */}
      <AnimatePresence>
        {isBlown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: Math.random() * 3 + "px",
                  height: Math.random() * 3 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TEKS DI ATAS LILIN --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 z-10"
      >
        <h1 className="text-white text-4xl font-black uppercase tracking-tighter mb-2">
          Make a Wish
        </h1>
        <p className="text-gray-400 text-sm font-medium italic">
          Sebutin dalam hati keinginan kamu, lalu tiup lilinnya...
        </p>
      </motion.div>

      {/* --- VISUAL LILIN --- */}
      <div className="relative flex flex-col items-center z-10">
        <div className="relative flex justify-center w-full h-24 mb-[-10px]">
          {!isBlown ? (
            <div className="neo-flame absolute bottom-0" />
          ) : (
            <div className="neo-smoke absolute bottom-0" />
          )}
        </div>

        <div className="w-1.5 h-6 bg-gradient-to-b from-gray-900 to-gray-700 rounded-t-full relative z-10" />

        <div className="w-16 h-48 bg-[#fff5e6] rounded-t-xl relative shadow-[inset_0_-10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
          {!isBlown && (
            <div className="absolute inset-0 bg-gradient-to-b from-orange-400/40 via-transparent to-transparent" />
          )}
        </div>
      </div>

      <p className="mt-12 text-white/50 text-[10px] uppercase tracking-[0.3em] z-10">
        {!isBlown
          ? "TIUP MICROPHONE SEKARANG"
          : "Semoga semua keinginanmu terkabul... ✨"}
      </p>
    </div>
  );
}
