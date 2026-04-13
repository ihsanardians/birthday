"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// 1. TAMBAHKAN `volume` di sini dengan default 1 (100%)
export default function MusicPlayer({
  isSurpriseTime,
  hasStarted,
  volume = 1,
}: {
  isSurpriseTime: boolean;
  hasStarted: boolean;
  volume?: number;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 2. LOGIKA BARU: Atur volume setiap kali nilai `volume` berubah dari page.tsx
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Trigger musik PERTAMA KALI saja saat tombol Welcome diklik
  useEffect(() => {
    if (hasStarted && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => console.log("Gagal play:", e));
    }
  }, [hasStarted]); // isPlaying dihapus dari sini

  // Ganti lagu otomatis saat jam 00:00 (Fase Kejutan)
  useEffect(() => {
    if (audioRef.current && isSurpriseTime) {
      audioRef.current.src = "/music/surprise.mp3";
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.log("Gagal play:", e));
      }
    }
  }, [isSurpriseTime]); // isPlaying dihapus dari sini

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <audio ref={audioRef} src="/music/home.mp3" loop />

      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative backdrop-blur-sm p-1.5 rounded-full shadow-2xl border-1 border-pink-100 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {/* Kontainer Bulat Sempurna untuk Vinyl */}
        <div className="w-14 h-14 relative rounded-full overflow-hidden shadow-inner bg-black">
          {/* Hanya Piringan Hitam PNG */}
          <img
            src="/images/piringan-hitam.png"
            alt="Vinyl"
            className="w-full h-full object-cover animate-spin"
            style={{
              animationDuration: "4s",
              // Putaran dijeda mulus di posisi terakhir
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          />
        </div>
      </motion.button>
    </div>
  );
}
